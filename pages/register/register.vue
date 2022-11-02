<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册图书商城</view>
			<u-input class="u-border-bottom" type='text' v-model="name" trim @blur='nameBlur()' @focus='Focus()'
				:focus='true' placeholder="请输入用户名" />
			<view class="alternative">
				<view class="enroll" v-show="nameFlag">用户名未输入，请重新输入</view>
			</view>
			<u-input class="u-border-bottom" type='text' v-model="email" trim @blur='emailBlur()' @focus='Focus()'
				placeholder="请输入邮箱" />
			<view class="alternative">
				<view class="enroll" v-show="emailFlag">邮箱未输入或者格式不正确，请重新输入</view>
			</view>
			<u-input class="u-border-bottom" type='password' @blur='passwordBlur()' @focus='Focus()' v-model="password"
				trim :password-icon="true" placeholder="请输入密码" />
			<view class="alternative">
				<view class="enroll" v-show="passwordFlag">密码未输入,请输入密码</view>
			</view>
			<u-input class="u-border-bottom" type='password' @blur='passwordBlur1()' @focus='Focus()'
				v-model="password1" trim :password-icon="true" placeholder="请再次输入密码" />
			<view class="alternative">
				<view class="enroll" v-show="passwordFlag1">密码不一致，请重新输入密码</view>
			</view>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">立即注册</button>
			<view class="alternative">
				<view class="enroll" @click='login'>已有账户，立即登入</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				password1: '',
				nameFlag: '',
				emailFlag: false,
				passwordFlag: false,
				passwordFlag1: false,
			}
		},
		onLoad() {
			// #ifdef H5
			sessionStorage.setItem('register', 'register')
			// #endif
			// #ifndef H5
			localStorage.setStorage('register', 'register')
			// #endif
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
		methods: {
			async submit() {
				if (this.$u.test.email(this.email) && this.password && this.password1 && this.name) {
					const params = {
						name: this.name,
						email: this.email,
						password: this.password,
						password_confirmation: this.password1
					}
					const res = await this.$u.post('/api/auth/register', params)
					if (res.statusCode != 201) {
						this.$u.toast('注册失败')
						return setTimeout(() => {
							this.login()
						}, 1500)
					}
					this.$u.toast('注册成功')
					setTimeout(() => {
						this.login()
					}, 1500)
				}

			},
			login() {
				this.$u.route({
					url: 'pages/login/login'
				})
			},
			Focus() {
				this.nameFlag = false
				this.emailFlag = false
				this.passwordFlag = false
				this.passwordFlag1 = false
			},
			nameBlur() {
				if (this.name == '') {
					this.nameFlag = true
				}
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
			},
			passwordBlur1() {
				if (this.password1 != this.password || this.password1 == '') {
					this.passwordFlag1 = true
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
