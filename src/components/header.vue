<template>
	<div class="hedaer">
		<el-menu
			:default-active="activeIndex"
			class="el-menu-demo"
			mode="horizontal"
			style="height: 80px;"
			background-color="rgb(50, 65, 87)"
			text-color="#fff"
			active-text-color="#ffd04b"
			@select="handleSelect"
		>
  			<el-menu-item v-if="navInfo.length" v-for="(item, index) in navInfo" :key="index" :index="item.index">{{ item.label }}</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
import { ajaxGet } from '@/utils/interceptor'
import { mapMutations } from 'vuex'
import { getCookie } from '@/utils/cookies'
export default {
	mounted () {
		if (getCookie('logining')) {
			this.getHeaders()
		} else {
			this.$router.push('/login')
		}
	},
	data () {
		return {
			activeIndex: window.sessionStorage.getItem('currentModule') || '1',
			currentModule: 'Node',
			navInfo: []
		}
	},
	methods: {
		...mapMutations(['changeLeftNavInfo']),
		getHeaders () {
			ajaxGet('/header').then(res => {
				if (res.data.code === 200) {
					this.navInfo = res.data.body
				}
			})
		},
		handleSelect (val) {
			this.currentModule = this.navInfo.filter(item => item.index === val)[0].index
			window.sessionStorage.setItem('currentModule', this.currentModule)
			if (!getCookie('logining')) {
				this.$router.push('/login')
			}
		}
	},
	watch: {
		currentModule (valNew, valOld) {
			if (valNew !== valOld) {
				this.changeLeftNavInfo(valNew)
				this.$router.push('/nav/welcome')
			}
		} 
	}
}
</script>
<style scoped lang="less">
	.hedaer {
		height:100%;
		background: rgb(50, 65, 87);
		overflow: hidden;
	}
	.el-menu--horizontal>.el-menu-item {
		height: 80px;
		line-height: 80px;
	}
	.el-menu.el-menu--horizontal {
		border-bottom: 0;
	}
</style>