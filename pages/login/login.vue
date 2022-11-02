<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<u-input class="u-border-bottom" type='text' v-model="email" trim @blur='emailBlur()' @focus='Focus()'
				:focus='true' placeholder="请输入邮箱" />
			<view class="alternative">
				<view class="enroll" v-show="emailFlag">邮箱未输入或者格式不正确，请重新输入</view>
			</view>
			<u-input class="u-border-bottom" type='password' @blur='passwordBlur()' @focus='Focus()' v-model="password"
				trim :password-icon="true" placeholder="请输入密码" />
			<view class="alternative">
				<view class="enroll" v-show="passwordFlag">密码未输入,请输入密码</view>
			</view>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">立即登入</button>
			<view class="alternative">
				<view class="enroll" @click='register'>没有账户，立即注册</view>
			</view>
		</view>
		<view class="buttom">
			<view class="hint" style="text-align: center;">
				登录代表同意
				<text class="link">图书商城用户协议、隐私政策，</text>
				并授权使用您的图书商城账号信息(如昵称、头像、收获地址)以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '1793056542@qq.com',
				password: 'zjt07191713',
				emailFlag: false,
				passwordFlag: false,
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.$u.test.email(this.email) && this.password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		onLoad() {
			// #ifdef H5
			if (sessionStorage.getItem('url') && !sessionStorage.getItem('register')) {
				return this.$u.toast('未登入，请登入')
			}
			// #endif
			// #ifndef H5
			if (localStorage.getItem('url') && !localStorage.getItem('register')) {
				return this.$u.toast('未登入，请登入')
			}
			// #endif
		},
		methods: {
			async submit() {
				if (this.$u.test.email(this.email) && this.password) {
					const params = {
						email: this.email,
						password: this.password
					}
					const res = await this.$u.post('/api/auth/login', params)
					if (res.statusCode != 200) {
						if (res.data.message == "Unauthorized") {
							this.email = ''
							this.password = ''
							return this.$u.toast('邮箱或者密码错误，请重新输入')
						}
					}
					// #ifdef H5
					sessionStorage.setItem('access_token', res.data.access_token)
					// #endif
					// #ifndef H5
					localStorage.setItem('access_token', res.data.access_token)
					// #endif
					this.$u.toast('登入成功')
					let paramsObject = {}
					// #ifdef H5
					if (sessionStorage.getItem('params')) {
						const paramsStr = sessionStorage.getItem('params')
						const arr = paramsStr.split('&')
						arr.forEach((item) => {
							paramsObject[item.split('=')[0]] = item.split('=')[1]
						})
					}
					const url = sessionStorage.getItem('url')
					sessionStorage.removeItem('url')
					sessionStorage.removeItem('params')
					sessionStorage.removeItem('register')
					// #endif
					// #ifndef H5
					if (localStorage.getStorage('params')) {
						const paramsStr = localStorage.setStorage('params')
						const arr = paramsStr.split('&')
						arr.forEach((item) => {
							paramsObject[item.split('=')[0]] = item.split('=')[1]
						})
					}
					const url = localStorage.getStorage('url')
					localStorage.clearStorage('url')
					localStorage.clearStorage('params')
					localStorage.clearStorage('register')
					// #endif
					if (url != 'pages/goodbus/goodbus' && url != 'pages/center/center') {
						return setTimeout(() => {
							this.$u.route({
								type: 'redirectTo',
								url: url,
								params: paramsObject
							})
						}, 1500)
					}
					return setTimeout(() => {
						this.$u.route({
							type: 'switchTab',
							url: url,
							params: paramsObject
						})
					}, 1500)
				}

			},
			register() {
				this.$u.route({
					url: 'pages/register/register'
				})
			},
			Focus() {
				this.emailFlag = false
				this.passwordFlag = false
			},
			emailBlur() {
				if (!this.$u.test.email(this.email)) {
					this.emailFlag = true
				}
			},
			passwordBlur() {
				if (this.password == '') {
					this.passwordFlag = true
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: center;
				font-size: 48rpx;
				color: #ff6a00;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				margin: 12rpx 0;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				height: 16px;
				line-height: 16px;
				color: #ff6a00;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
