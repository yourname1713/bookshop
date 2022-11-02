<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<view class="u-search-inner">
				<u-search placeholder="输入商品名称" v-model.trim="keyword" @custom='search'></u-search>
			</view>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
				@scrolltolower='onReachBottom1'>
				<view style="background-color:#f6f6f6;">
					<text class="u-line-1 u-font-38"
						style="height: 55px;display: block;line-height: 55px;"><strong>全部商品</strong></text>
					<view :key=0 class="u-tab-item" :class="[current==0 ? 'u-tab-item-active':'']" :data-current=0
						@tap.stop="swichMenu(0)">
						<text class="u-line-1">全部商品</text>
					</view>
				</view>
				<view v-for="item in tabbar" :key="item.id" style="background-color:#f6f6f6;">
					<text class="u-line-1 u-font-38"
						style="height: 55px;display: block;line-height: 55px;"><strong>{{item.name}}</strong></text>
					<view v-for="item1 in item.children" :key="item1.id" class="u-tab-item"
						:class="[current==item1.id ? 'u-tab-item-active':'']" :data-current="item1.id"
						@tap.stop="swichMenu(item1.id)">
						<text class="u-line-1">{{item1.name}}</text>
					</view>
				</view>
			</scroll-view>
			<block>
				<scroll-view scroll-y class="right-box" @scrolltolower='onReachBottom1'>
					</u-collapse>
					<u-collapse :arrow='true' arrow-color="skyblue"
						style='display: flex;justify-content: space-around;'>
						<view :class="[flag ? 'item-active':'']" class="height" @click="flagChange">默认</view>
						<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index"
							:open='item.open' @change='itemChange({index:index,show:item.open})'
							:class="[item.flag ? 'item-active':'']">
						</u-collapse-item>
					</u-collapse>
					<view class="page-view">
						<view class="class-item">
							<view class="item-container">
								<u-row customStyle="margin-bottom: 10px" gutter='10' style='flex-wrap:wrap'
									class='thumb-box' v-if="goodlist.length!=0">
									<u-col span='6' v-for="(item,index) in goodlist" :key="item.id+'-'+index">
										<navigator :url='`/pages/goods/show?id=${item.id}`'>
											<view>
												<u-image :showLoading="true" :src=item.cover_url width="100%"
													height="300rpx"></u-image>
												<view class="title">
													{{item.title}}
												</view>
												<view class="box">
													<view class='price'><text>￥</text>{{item.price.toFixed(2)}}</view>
												</view>
												<view class="box">
													<view><text>销量:</text>{{item.sales}}</view>
													<view><text>评论数:</text>{{item.comments_count}}</view>
												</view>
											</view>
										</navigator>
									</u-col>
								</u-row>
								<view class="title1" v-else>
									暂无商品
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
					head: "销量",
					open: false,
					flag: false
				}, {
					head: "价格",
					open: false,
					flag: false
				}, {
					head: "评论数",
					open: false,
					flag: false
				}],
				flag: true,
				current1: 0,
				tabbar: [],
				goodlist: [],
				params: {
					page: 1,
				},
				next_page_url: '',
				keyword: '',
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		onLoad() {
			this.getGood()
		},
		methods: {
			async getGood() {
				const res = await this.$u.get('/api/goods', this.params)
				if (res.statusCode != 200) return this.$u.toast('获取商品失败')
				this.next_page_url = res.data.goods.next_page_url
				this.tabbar = res.data.categories
				this.goodlist.push(...res.data.goods.data)
			},
			search() {
				this.current = 0
				this.goodlist = []
				this.tabbar = []
				this.current1 = 0
				this.params = {
					page: 1,
					title: this.keyword
				}
				if (this.flag != true) {
					this.flag = !this.flag
					for (let i = 0; i < this.itemList.length; i++) {
						this.itemList[i].flag = false
						this.itemList[i].open = false
					}
				}
				this.getGood()
			},
			// // 点击左边的栏目切换
			async swichMenu(index) {
				this.keyword = ''
				if (this.flag != true) {
					this.flag = !this.flag
					for (let i = 0; i < this.itemList.length; i++) {
						this.itemList[i].flag = false
						this.itemList[i].open = false
					}
				}
				if (index == this.current) return;
				this.current = index;
				this.params = {
					page: 1
				}
				if (index != 0) {
					this.params = {
						page: 1,
						category_id: this.current
					}
				}
				this.goodlist = []
				this.getGood()
			},
			onReachBottom1() {
				if (this.next_page_url == null) return this.$u.toast('已展示全部商品')
				this.params.page += 1
				if (this.params.page < 17) {
					this.getGood()
				} else this.$u.toast('已展示全部商品')
			},
			flagChange() {
				if (this.flag == true) return
				this.flag = !this.flag
				for (let i = 0; i < this.itemList.length; i++) {
					this.itemList[i].flag = false
					this.itemList[i].open = false
				}
				this.goodlist = []
				this.params = {
					page: 1
				}
				if (this.current != 0) {
					this.params = {
						page: 1,
						category_id: this.current
					}
				}
				this.getGood()
			},
			itemChange({
				index,
				show
			}) {
				for (let i = 0; i < this.itemList.length; i++) {
					if (index == i) {
						this.itemList[i].flag = true
						this.itemList[i].open = !show
					} else {
						this.itemList[i].flag = false
						this.itemList[i].open = false
					}
				}
				this.flag = false
				this.params = {
					page: 1
				}
				const flag1 = this.itemList[index].open ? 2 : 1
				if (this.keyword != '') {
					this.params = {
						...this.params,
						title: this.keyword
					}
				}
				if (this.current != 0) {
					this.params = {
						...this.params,
						category_id: this.current
					}
				}
				if (index == 0) {
					this.params = {
						...this.params,
						sales: flag1
					}
				}
				if (index == 1) {
					this.params = {
						...this.params,
						price: flag1
					}
				}
				if (index == 2) {
					this.params = {
						...this.params,
						comments_count: flag1
					}
				}
				this.goodlist = []
				this.getGood()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}


	.item-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 100%;
	}

	.title {
		width: 100%;
		text-align: center;
		margin: 20rpx 0 10rpx;
	}
	.title1 {
		width: 100%;
		font-size: 68rpx;
		text-align: center;
		color: darkblue;
		margin: 100rpx 0 10rpx;
	}

	.box {
		display: flex;
		justify-content: space-around;

		.price {
			color: red;
		}
	}

	.height {
		margin: auto 10rpx;
		font-size: 30rpx;
		line-height: 30rpx;
	}

	.item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
	}
</style>
