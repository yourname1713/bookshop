<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-40" style='width: 70px;height: 70px;'>
				<u-upload :action="action" max-count='1' :max-size='5*1024*1024' :before-upload='beforeUpload'
					:custom-btn='true' :show-progress='false' :form-data='formData' :deletable='false' width='0'
					height='0' @on-success='onSuccess' ref='upload'>
					<u-avatar slot='addBtn' :src=userObject.avatar_url size="140"></u-avatar>
				</u-upload>
			</view>
			<view class="u-flex-1 u-m-t-20">
				<view class="u-font-18 u-p-b-20">用户名:{{userObject.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{userObject.email}}</view>
				<view class="u-font-14 u-tips-color">签名:世界永不偏袒愚者</view>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="我的订单" @click='payment'></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="我的收藏" @click='collectgoods'></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="map" title="地址管理" @click='address'></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="账号管理" @click='userInfo'></u-cell-item>
			</u-cell-group>
		</view>
		<button class="getCaptcha" @click="exit">退出登入</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userObject: {},
				action: '',
				formData: {}
			}
		},
		onLoad() {
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
			}
			// #endif

			this.getUser()
		},
		methods: {
			async getUser() {
				const res = await this.$u.get('/api/user')
				if (res.statusCode != 200) {
					return this.$u.toast('获取用户信息失败')
				}
				this.userObject = res.data
				return
			},
			async exit() {
				const res = await this.$u.post('/api/auth/logout')
				if (res.statusCode != 204) return this.$u.toast('退出登入失败')
				sessionStorage.removeItem('access_token')
				this.$u.toast('退出成功')
				return setTimeout(() => {
					this.$u.route({
						type: 'reLaunch',
						url: '/pages/index/index'
					})
				}, 2000)
			},
			userInfo() {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/center/userInfo'
				})
			},
			collectgoods() {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/center/collectgoods'
				})
			},
			address() {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/center/address'
				})
			},
			payment() {
				this.$u.route({
					type: 'navigateTo',
					url: '/pages/goodbus/payment'
				})
			},
			async beforeUpload(index, list) {
				const {
					file
				} = list[0]
				// #ifdef H5
				const fileName = file.name
				// #endif
				// #ifndef H5
				const fileName = file.path
				// #endif
				const name = this.$u.guid(20) + fileName.slice(fileName.lastIndexOf('.'))
				const res = await this.$u.get('/api/auth/oss/token')
				if (res.statusCode != 200) return this.$u.toast('更新头像失败')
				this.action = res.data.host
				this.formData = {
					key: name,
					policy: res.data.policy,
					OSSAccessKeyID: res.data.accessid,
					seccess_action_status: '200',
					signature: res.data.signature
				}
				return true;
			},
			async onSuccess() {
				const res = await this.$u.post('/api/user/avatar', {
					avatar: this.formData.key
				})
				if (res.statusCode != 204) return this.$u.toast('更新头像失败')
				this.$refs.upload.remove(0)
				this.getUser()
				return this.$u.toast('更新头像成功')
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}

	.getCaptcha {
		border: none;
		font-size: 30rpx;
		margin: 32rpx;
		padding: 12rpx 0;
		color: #fff;
		background-color: orange;
	}
</style>
