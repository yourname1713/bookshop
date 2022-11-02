<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left"><text style="color: red">*</text>收货人</view>
				<input v-model="address.name" type="text" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left"><text style="color: red">*</text>手机号码</view>
				<input v-model="address.phone" type="text" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="show = true">
				<view class="left"><text style="color: red">*</text>所在地区</view>
				<input disabled :value="location" type="text" placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left"><text style="color: red">*</text>详细地址</view>
				<textarea v-model="address.address" type="text" placeholder-class="line" placeholder="请输入详细地址" />
			</view>
			<view class="defult">
				<view class="set">设置默认地址</view>
				<u-switch v-model="address.isDefault" color="#3191FD"></u-switch>
			</view>
			<view class="btns">
				<u-button @click="handleDelAddress" class="btn" shape="circle" type="error">
					删除地址
				</u-button>
				<u-button @click="handleSaveAddress" shape="circle" :type="isSubmit ? 'primary' : 'default'"
					class="btn">
					保存地址
				</u-button>
			</view>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" @confirm="confirmAddress" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				address: {
					name: "",
					phone: "",
					address: "",
					province: "",
					city: "",
					county: "",
				},
			};
		},
		onLoad(options) {
			if (options.id) {
				options.isDefault = options.is_default == 0 ? false : true;
				this.address = options;
			}
		},
		methods: {
			async handleSaveAddress() {
				if (this.isSubmit) {
					const address = this.address;
					const params = {
						name: address.name,
						address: address.address,
						phone: address.phone,
						province: address.province,
						city: address.city,
						county: address.county,
						is_default: address.isDefault ? 1 : 0,
					};
					if (address.id) {
						const res = await this.$u.put(`/api/address/${address.id}`, params)
						if (res.statusCode != 204) return this.$u.toast('数据错误')
						this.$u.toast("保存成功");
						setTimeout(() => {
							this.$u.route({
								type: "redirect",
								url: "/pages/center/address",
							});
						}, 1000);
					} else {
						const res = await this.$u.post(`/api/address`, params)
						if (res.statusCode != 201) return this.$u.toast('数据错误')
						this.$u.toast("保存成功");
						setTimeout(() => {
							this.$u.route({
								type: "redirect",
								url: "/pages/center/address",
							});
						}, 1000);
					}
				} else {
					this.$u.toast("请完整填写必填项目");
				}
			},
			confirmAddress(params) {
				this.address.province = params.province.label;
				this.address.city = params.city.label;
				this.address.county = params.area.label;
			},
			async handleDelAddress() {
				const address = this.address;
				if (address.isDefault) {
					this.$u.toast("默认地址不能删除");
				} else if (address.id) {
					const res = await this.$u.delete(`/api/address/${address.id}`);
					if (res.statusCode != 204) return this.$u.toast('删除失败')
					this.$u.toast("删除成功");
					setTimeout(() => {
						this.$u.route({
							type: "redirect",
							url: "/pages/center/address",
						});
					}, 1000);
				} else {
					this.$u.toast("地址还未保存");
				}
			},
		},
		computed: {
			location() {
				return this.address.province + this.address.city + this.address.county;
			},
			isSubmit() {
				let {
					name,
					phone,
					address
				} = this.address;
				return name != "" && phone != "" && address != "" && this.location != "";
			},
		},
	};
</script>

<style lang="scss" scoped>
	/deep/ .line {
		color: $u-light-color;
		font-size: 28rpx;
	}

	.wrap {
		background-color: #f2f2f2;

		.top {
			background-color: #ffffff;
			border-top: solid 2rpx $u-border-color;
			padding: 22rpx;

			.item {
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}

			.site-clipboard {
				padding-right: 40rpx;

				textarea {
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;

					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}

			.defult {
				display: flex;
				margin: 20rpx 0;
				padding: 20rpx 0;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #edeff4;
			}

			.btns {
				display: flex;
				position: absolute;
				bottom: 50rpx;
				left: 50%;
				transform: translateX(-50%);

				.btn {
					width: 300rpx;
					margin: 0 20rpx;
				}
			}
		}
	}
</style>
