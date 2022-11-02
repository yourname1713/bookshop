<template>
	<view class="wrap u-rela">
		<view class="goods-show">
			<view class="u-text-center">
				<u-image :showLoading="true" :src=goodDetailsObject.cover_url width="100%" height="600rpx">
				</u-image>
			</view>
			<view class="u-p-20">
				<view class="base-info ">
					<view class="title u-font-40 u-text-center" style="background-color: coral;color: #fff;">
						{{goodDetailsObject.title}}
					</view>
					<text class="title u-font-20">
						{{goodDetailsObject.description}}
					</text>
					<view class="u-flex u-row-between u-m-t-20 u-m-b-20">
						<text class="price u-font-32" v-if='goodDetailsObject.price==null'><text>￥</text>暂无定价</text>
						<text class="price u-font-32" v-else><text>￥</text>{{goodDetailsObject.price.toFixed(2)}}</text>
						<text class="u-font-32"
							style="color:deepskyblue"><text>☆</text>{{goodDetailsObject.collects_count}}</text>
						<text class="small">库存:{{goodDetailsObject.stock}}</text>
						<text class="small">销量:{{goodDetailsObject.sales}}</text>
					</view>
				</view>
				<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="tabChange" lineWidth='50'>
				</u-tabs>
				<view class="u-p-b-80">
					<template v-if="current==0">
						<u-parse :html="goodDetailsObject.details"></u-parse>
					</template>
					<template v-if="current==1">
						<template v-if="goodDetailsObject.comments.length">
							<view class="comment" v-for="item in goodDetailsObject.comments" :key="item.order_id">
								<view class="left">
									<image :src="item.user.avatar_url" mode="aspectFill"></image>
								</view>
								<view class="right">
									<view class="top">
										<view class="name">{{ item.user.name }}</view>
										<view class="like highlight">
											<view class="num" v-if='item.star!=0'>
												<text>商品星级:</text>{{ item.star }}<text>☆</text>
											</view>
											<view class="num" v-else><text>商品星级:</text>用户暂无评级</view>
										</view>
									</view>
									<view class="content">{{ item.content }}</view>
									<view class="reply-box">
										<view class="text">{{ item.reply }}</view>
									</view>
									<view class="bottom">
										{{ item.created_at }}
									</view>
								</view>
							</view>
						</template>
						<template v-else>
							<u-empty text="暂无评论" src="order"></u-empty>
						</template>
					</template>
					<template v-if="current==2">
						<u-row customStyle="margin-bottom: 10px" gutter='10' style='flex-wrap:wrap'>
							<u-col span="6" v-for="item in goodLikeList" :key="item.id">
								<navigator :url='`/pages/goods/show?id=${item.id}`' class="goodItems">
									<u-image :showLoading="true" :src=item.cover_url width="100%" height="300rpx">
									</u-image>
									<view class="title">
										{{item.title}}
									</view>
									<view class="box">
										<view class='price'><text>￥</text>{{item.price.toFixed(2)}}</view>
										<view class=""><text>销量:</text>{{item.sales}}</view>
									</view>
								</navigator>
							</u-col>
						</u-row>
					</template>
				</view>
			</view>
		</view>
		<view class="navigation">
			<view class="left">
				<view class="item" @click="myLove">
					<u-icon v-if="!collectNum" name="heart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<u-icon v-else name="heart-fill" :size="40" color="#2979ff"></u-icon>
					<view class="text u-line-1">{{collectNum?"已收藏":"收藏"}}</view>
				</view>
				<view class="item" @click="goodbus">
					<u-badge :count="cartNum" bgColor="#2979ff" :is-center="true"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<u-button class="cart btn" :ripple="true" type="primary" @click='addGoodBus'>加入购物车</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				tabList: [{
					name: '概述'
				}, {
					name: '热评',
					count: 0
				}, {
					name: '相关图书'
				}],
				current: 0,
				goodDetailsObject: {},
				count: 0,
				goodLikeList: [],
				collectNum: 0,
				cartNum: 0
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getGoodDetails()
		},
		methods: {
			async getGoodDetails() {
				const res = await this.$u.get(`/api/goods/${this.id}`)
				if (res.statusCode != 200) return this.$u.toast('获取商品详情失败')
				this.goodDetailsObject = res.data.goods
				this.goodLikeList = res.data.like_goods
				this.tabList[1].count = res.data.goods.comments.length
				this.collectNum = res.data.goods.is_collect
				// #ifdef H5
				if (sessionStorage.getItem('access_token')) {
					const res = await this.$u.get('/api/carts')
					if (res.statusCode != 200) return
					this.cartNum = res.data.data.length
				}
				// #endif
				// #ifndef H5
				if (localStorage.getItem('access_token')) {
					const res = await this.$u.get('/api/carts')
					if (res.statusCode != 200) return
					this.cartNum = res.data.data.length
				}
				// #endif
			},
			tabChange(index) {
				this.current = index
			},
			async myLove() {
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
					const res = await this.$u.post(`/api/collects/goods/${this.id}`)
					if (res.statusCode != 201 && res.statusCode != 204) return this.$u.toast('收藏(取消收藏)商品失败')
					if (res.statusCode == 201) {
						this.collectNum = 1
						return this.$u.toast('收藏商品成功')
					}
					if (res.statusCode == 204) {
						this.collectNum = 0
						return this.$u.toast('取消收藏商品成功')
					}
				}
				// #endif
				// #ifndef H5
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
					const res = await this.$u.post(`/api/collects/goods/${this.id}`)
					if (res.statusCode != 201 && res.statusCode != 204) return this.$u.toast('收藏(取消收藏)商品失败')
					if (res.statusCode == 201) {
						this.collectNum = 1
						return this.$u.toast('收藏商品成功')
					}
					if (res.statusCode == 204) {
						this.collectNum = 0
						return this.$u.toast('取消收藏商品成功')
					}
				}
				// #endif
			},
			goodbus() {
				return this.$u.route({
					type: 'switchTab',
					url: '/pages/goodbus/goodbus'
				})
			},
			async addGoodBus() {
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
					const res = await this.$u.post('/api/carts', {
						goods_id: this.id
					})
					if (res.statusCode != 201) return this.$u.toast('重复添加商品')
					this.getGoodDetails()
					return this.$u.toast('添加商品成功')
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
					const res = await this.$u.post('/api/carts', {
						goods_id: this.id
					})
					if (res.statusCode != 201) return this.$u.toast('重复添加商品')
					this.getGoodDetails()
					return this.$u.toast('添加商品成功')
				}
				// #endif
			}
		}
	}
</script>


<style lang="scss" scoped>
	.wrap {
		height: 90vh;

		.loading {
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.goods-show {
			.base-info {

				.title,
				.price {
					font-weight: bolder;
				}

				.price {
					color: rgb(209, 45, 58);
				}
			}

			.comment {
				display: flex;
				padding: 30rpx;

				.left {
					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						background-color: #f2f2f2;
					}
				}

				.right {
					flex: 1;
					padding-left: 20rpx;
					font-size: 30rpx;

					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 10rpx;

						.name {
							color: #5677fc;
						}

						.like {
							display: flex;
							align-items: center;
							color: #9a9a9a;
							font-size: 26rpx;

							.num {
								margin-right: 4rpx;
								color: #9a9a9a;
							}
						}

						.highlight {
							color: #5677fc;

							.num {
								color: #5677fc;
							}
						}
					}

					.content {
						margin-bottom: 10rpx;
					}

					.reply-box {
						background-color: rgb(242, 242, 242);
						border-radius: 12rpx;
						text-indent: 1em;

						.item {
							padding: 20rpx;
							border-bottom: solid 2rpx $u-border-color;

							.username {
								font-size: 24rpx;
								color: #999999;
							}
						}

						.all-reply {
							padding: 20rpx;
							display: flex;
							color: #5677fc;
							align-items: center;

							.more {
								margin-left: 6rpx;
							}
						}
					}

					.bottom {
						margin-top: 20rpx;
						display: flex;
						font-size: 24rpx;
						color: #9a9a9a;

						.reply {
							color: #5677fc;
							margin-left: 10rpx;
						}
					}
				}
			}
		}

		// min-height: 100vh;
		.navigation {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			border: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx 0;
			justify-content: space-between;

			.left {
				flex: 3;
				display: flex;
				font-size: 20rpx;
				justify-content: space-around;

				.item {
					position: relative;
					text-align: center;
				}
			}

			.right {
				flex: 9;
				display: flex;
				font-size: 28rpx;
				justify-content: flex-end;
				align-items: center;

				.btn {
					text-align: center;
					line-height: 66rpx;
					width: 90%;
					border-radius: 10rpx;
					color: #ffffff;
				}

				.cart {
					background-color: #2979ff;
					margin-right: 30rpx;
				}

				.buy {
					background-color: #ff7900;
				}
			}
		}
	}

	.goodItems {
		padding: 20rpx;
		font-size: 30rpx;
		box-shadow: 0 12rpx 20rpx rgba(0, 0, 0, 0.1);

		.title {
			text-align: center;
			margin: 20rpx 0 10rpx;
		}

		.box {
			display: flex;
			justify-content: space-around;

			.price {
				color: red;
			}
		}
	}
</style>
