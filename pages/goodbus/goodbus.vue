<template>
	<view class="wrap">
		<template>
			<view v-if="goodsList.length" class="cartGoodsList u-p-b-80">
				<view class="cartGoods u-flex u-p-15" v-for="goods in goodsList" :key="goods.id">
					<view>
						<u-checkbox size="40" shape="circle" v-model="goods.is_checked?true:false"
							@change="checkboxChange" :name="goods.id"></u-checkbox>
					</view>
					<view class="goodsInfo u-flex u-p-10">
						<view @tap='jump(`/pages/goods/show`,goods.goods_id)'>
							<u-image :src=goods.goods.cover_url border-radius="15" width="200rpx" height="200rpx">
							</u-image>
						</view>
						<view class="goodsBaseInfo u-flex u-row-between u-col-top u-p-10">
							<view class="priceNum" @tap='jump(`/pages/goods/show`,goods.goods_id)'>
								<text class="title u-p-l-10 u-font-32">{{goods.goods.title}}</text>
								<br>
								<text class="small">{{goods.goods.description}}</text>
								<view class="u-text-right small">
									库存:<text style="color:red">{{goods.goods.stock}}</text>
								</view>
							</view>
							<view class="priceNum u-flex u-row-between">
								<text class="price u-font-34">￥{{goods.goods.price.toFixed(2)}}</text>
								<u-number-box v-model="goods.num" @change="valChange" :min="1" :max="goods.goods.stock"
									:index="goods.id"></u-number-box>
								<u-icon name="trash" color="#e83333" size="36" @click='deleteGood(goods.id)'>
								</u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="empty" v-else>
				<u-empty text="购物车空空如也" mode="car"></u-empty>
			</view>
			<view class="bottomFixed u-flex u-p-15">
				<view class="u-flex-5">
					<u-checkbox size="40" shape="circle" v-model='allChecked'>全选</u-checkbox>
				</view>
				<view class="u-flex u-flex-7 u-row-around">
					<view>
						<text class="title">合计:</text>
						<text class="price">{{totalPrice}}</text>
					</view>
					<u-button type="primary" :ripple="true" shape="square" :disabled='flag' @click='payment'>去结算
					</u-button>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				flag: true
			};
		},
		onShow() {
			// #ifdef H5
			if (!sessionStorage.getItem('access_token')) {
				const page = getCurrentPages().pop()
				const options = page.options
				const optionKeys = Object.keys(options)
				let params = ''
				if (optionKeys.length != 0) {
					optionKeys.forEach((item) => {
						params += item + '=' + options[item] + '&'
					})
					params = params.slice(0, -1)
					sessionStorage.setItem('params', params)
				}
				sessionStorage.setItem('url', page.route)
				return this.$u.route({
					type: 'redirectTo',
					url: '/pages/login/login'
				})
			} else {
				this.getCartGoods()
			}
			// #endif
			// #ifndef H5
			if (!localStorage.getItem('access_token')) {
				const page = getCurrentPages().pop()
				const options = page.options
				const optionKeys = Object.keys(options)
				let params = ''
				if (optionKeys.length != 0) {
					optionKeys.forEach((item) => {
						params += item + '=' + options[item] + '&'
					})
					params = params.slice(0, -1)
					localStorage.setItem('params', params)
				}
				localStorage.setItem('url', page.route)
				return this.$u.route({
					type: 'redirectTo',
					url: '/pages/login/login'
				})
			} else {
				this.getCartGoods()
			}
			// #endif
		},
		computed: {
			allChecked: {
				get() {
					return this.goodsList.every(item => {
						return item.is_checked
					})
				},
				set(val) {
					this.allCheckboxChange(val)
				}
			},
			totalPrice() {
				// return this.goodsList.filter((goods) => { //过滤掉没有选中商品
				// 	if (goods.is_checked) {
				// 		return true
				// 	}
				// }).reduce((pre, goods) => { //价格累加
				// 	return parseInt(pre) + parseInt(goods.goods.price) * goods.num //乘商品数量
				// }, 0)
				let sum = 0
				this.goodsList.forEach(item => {
					if (item.is_checked) {
						sum += item.goods.price * item.num
					}
				})
				sum = sum.toFixed(2)
				return sum
			}
		},
		methods: {
			jump(url, id) {
				this.$u.route({
					url,
					params: {
						id
					}
				})
			},
			// 获取购物车内商品
			async getCartGoods() {
				const res = await this.$u.get('/api/carts', {
					include: 'goods'
				})
				if (res.statusCode != 200) return this.$u.toast('获取购物车列表失败')
				this.goodsList = res.data.data
				res.data.data.forEach(item => {
					if (item.is_checked) {
						this.flag = false
						return
					}
				})
			},
			async valChange(e) {
				const {
					value,
					index
				} = e
				const res = await this.$u.put(`/api/carts/${index}`, {
					num: value
				})
				if (res.statusCode != 204) return this.$u.toast('修改数量失败')
			},
			async checkboxChange(e) {
				const arr = []
				this.goodsList.forEach(item => {
					if (item.is_checked) {
						arr.push(item.id)
					}
				})
				this.flag = arr.length > 0 ? false : true
				const {
					value,
					name
				} = e
				if (!value) {
					arr.splice(arr.indexOf(name), 1)
					const res = await this.$u.patch('/api/carts/checked', {
						cart_ids: arr
					})
					if (res.statusCode != 204) return this.$u.toast('修改选择状态失败')
				} else {
					arr.push(name)
					const res = await this.$u.patch('/api/carts/checked', {
						cart_ids: arr
					})
					if (res.statusCode != 204) return this.$u.toast('修改选择状态失败')
				}
				this.flag = arr.length > 0 ? false : true
				this.getCartGoods()
			},
			async allCheckboxChange(val) {
				let arr = []
				if (!val) {
					arr = []
					const res = await this.$u.patch('/api/carts/checked', {
						cart_ids: arr
					})
					if (res.statusCode != 204) return this.$u.toast('修改选择状态失败')
				} else {
					this.goodsList.forEach((item) => {
						arr.push(item.id)
					})
					const res = await this.$u.patch('/api/carts/checked', {
						cart_ids: arr
					})
					if (res.statusCode != 204) return this.$u.toast('修改选择状态失败')
				}
				this.flag = arr.length > 0 ? false : true
				this.getCartGoods()
			},
			async deleteGood(id) {
				const res = await this.$u.delete(`/api/carts/${id}`)
				if (res.statusCode != 204) return this.$u.toast('删除购物车商品失败')
				this.getCartGoods()
			},
			payment() {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/goodbus/payment'
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		min-height: 80vh;

		.empty {
			height: 80vh;
		}

		.loading {
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.title,
		.price {
			font-weight: 800;
		}

		.price {
			color: #e83333;
		}

		.cartGoodsList {
			.cartGoods {
				.goodsInfo {
					width: 100%;
					background-color: rgb(251, 250, 251);

					.goodsBaseInfo {
						width: 100%;
						height: 200rpx;
						flex-direction: column;

						.priceNum {
							width: 100%;

						}
					}
				}
			}
		}

		.bottomFixed {
			position: fixed;
			left: 0;
			right: 0;
			background-color: #fff;
		}

		/*#ifdef H5*/
		.bottomFixed {
			bottom: 100rpx;
		}

		/*#endif*/
		/*#ifdef MP-WEIXIN*/
		.bottomFixed {
			bottom: 0;
			z-index: 99999;
		}

		/*#endif*/

	}
</style>
