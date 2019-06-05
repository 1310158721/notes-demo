<template>
	<div class="bg container rel">
		<el-card class="box-card abs card">
			<p class="title">我的笔记管理</p>
			<el-input class="space" v-model="postData.username" placeholder="请输入用户名称">
				<i slot="prefix" class="el-input__icon iconfont">&#xe62f;</i>
			</el-input>
			<el-input class="space" type="password" v-model="postData.password" placeholder="请输入用户名称">
				<i slot="prefix" class="el-input__icon iconfont">&#xe689;</i>
			</el-input>
			<el-button class="button space" type="success" @click="login">登 录</el-button>
		</el-card>
	</div>
</template>
<script>
import { ajaxPost } from '@/utils/interceptor'
import { setCookie } from '@/utils/cookies'
export default {
	data () {
		return {
			postData: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		canLogin () {
			ajaxPost('/login', this.postData).then(res => {
				if (res.data.code === 200) {
					this.$message.success(res.data.message)
					setCookie('logining', true)
					this.$router.push('/nav/welcome')
				} else {
					this.$message.error(res.data.message)
				}
			})
		},
		login () {
			if (this.postData.username !== '' && this.postData.password !== '') {
				this.canLogin()
			} else {
				this.$message.error('登录信息不能为空')
			}
		}
	}
}
</script>
<style scoped lang="less">
	.card {
		width: 320px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		.title {
			width: 100%;
			font-size: 14px;
			font-weight: bold;
			text-align: center;
			border-bottom: 1px solid #67c23a;
			padding-bottom: 10px;
			margin-bottom: 2em;
		}
		.space {
			margin-bottom: 22px;
		}
		.button {
			width: 100%;
		}
	}
</style>