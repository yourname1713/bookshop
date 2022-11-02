<template>
	<view class="wrap">
		<view class="collectList u-p-10" v-if='goodsList.length>0'>
			<view @tap='jump(`/pages/goods/show`,goods.goods_id)' class="goodsBox u-flex u-p-10 u-m-t-20 u-m-b-20"
				v-for="goods in goodsList" :key="goods.id">
				<view class="u-flex-3 u-border">
					<u-image width="100%" height="200" border-radius="20" :src="goods.goods.cover_url"></u-image>
				</view>
				<view class="u-flex baseInfo u-row-between u-flex-9 u-col-top">
					<text class="title u-font-32">{{goods.goods.title}}</text>
					<text class="price">￥{{goods.goods.price}}</text>
					<text>收藏时间:{{goods.created_at}}</text>
				</view>
			</view>
		</view>
		<view class="title" v-else>
			暂无收藏
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				params: {
					page: 1
				}
			};
		},
		onShow() {
			this.goodsList = []
			this.getCollect()
		},
		onReachBottom() {
			this.params.page += 1
			this.getCollect()
		},
		methods: {
			// 商品详情跳转
			jump(url, id) {
				this.$u.route({
					url,
					params: {
						id
					}
				})
			},
			async getCollect() {
				const res = await this.$u.get('/api/collects', this.params)
				if (res.statusCode != 200) return this.$u.toast('获取收藏失败')
				if (res.data.data.length == 0 && this.goodsList.length > 0) return this.$u.toast('已展示所有收藏')
				this.goodsList.push(...res.data.data)
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		.collectList {
			.goodsBox {
				box-shadow: 0 0 5rpx 6rpx rgba($color: #ccc, $alpha: 0.3);

				.baseInfo {
					height: 200rpx;
					flex-direction: column;

					.title {
						font-weight: 550;
					}

					.price {
						color: red;
					}
				}
			}
		}
	}

	.title {
		width: 100%;
		font-size: 68rpx;
		text-align: center;
		color: darkblue;
		margin: 100rpx 0 10rpx;
	}
</style>
