<template>
	<view class="u-p-l-40 u-p-r-40">
		<u-form :model="form" ref="uForm">
			<u-form-item label-width='100' label="用户名" prop="name" required>
				<u-input v-model="form.name" placeholder="" :boder='false' />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				form: {
					name: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入用户名',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		onLoad() {
			this.getUser()
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (!valid) return
					if (this.name == this.form.name) return this.$u.toast('用户名未修改')
					const res = await this.$u.put('/api/user', this.form)
					if (res.statusCode != 204) return this.$u.toast('更新用户名失败')
					this.$u.toast('更新用户名成功')
					return setTimeout(() => {
						this.$u.route({
							type: 'switchTab',
							url: '/pages/center/center'
						})
					}, 1500)
				})
			},
			async getUser() {
				const res = await this.$u.get('/api/user')
				if (res.statusCode != 200) return this.$u.toast('获取用户信息失败')
				this.form.name = res.data.name
				this.name = res.data.name
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>
