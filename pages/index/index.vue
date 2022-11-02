<template>
	<view>
		<u-swiper :list="imgList" name='img_url' :effect3d="true" indicator-pos="bottomLeft" previousMargin="30"
			nextMargin="30" circular :autoplay="true" radius="5" bgColor="#ffffff"></u-swiper>
		<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="tabChange" lineWidth='50'></u-tabs>
		<u-row customStyle="margin-bottom: 10px" gutter='10' style='flex-wrap:wrap'>
			<u-col span="6" v-for="(item,index) in bookList" :key="item.id+'-'+index">
				<navigator :url='`/pages/goods/show?id=${item.id}`' class="goodItems">
					<u-image :showLoading="true" :src=item.cover_url width="100%" height="300rpx"></u-image>
					<view class="title">
						{{item.title}}
					</view>
					<view class="box">
						<view class='price'><text>￥</text>{{item.price.toFixed(2)}}</view>
						<view style="color:deepskyblue">
							<text>☆</text>{{item.collects_count}}
						</view>
					</view>
					<view class="box">
						<view class=""><text>销量:</text>{{item.sales}}</view>
						<view><text>剩余:</text>{{item.stock}}</view>
					</view>
				</navigator>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				params: {
					page: 1
				},
				tabList: [{
					name: '热销'
				}, {
					name: '推荐'
				}, {
					name: '最新'
				}],
				current: 0,
				bookList: []
			}
		},
		onLoad() {},
		created() {
			this.getBookList()
		},
		onReachBottom() {
			this.params.page += 1
			this.getBookList()
		},
		methods: {
			tabChange(index) {
				this.current = index
				this.bookList = []
				this.params = {
					page: 1
				}
				if (this.current == 0) {
					this.params.sales = 1
				} else if (this.current == 1) {
					this.params.recommend = 1
				} else {
					this.params.new = 1
				}
				this.getBookList()
			},
			async getBookList() {
				const res = await this.$u.get('/api/index', this.params)
				if (res.statusCode != 200) {
					return this.$u.toast('获取内容失败')
				}
				this.imgList = res.data.slides
				this.bookList.push(...res.data.goods.data)
				return
			}
		}
	}
</script>

<style lang="scss" scoped>
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
