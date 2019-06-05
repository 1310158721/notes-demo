<template>
	<div class="left-nav">
		<el-menu
      		:default-active="activeIndex"
      		class="el-menu-vertical-demo"
      		@open="handleOpen"
      		@close="handleClose"
      		background-color="#e6e6e6"
      		text-color="#000"
      		active-text-color="#409eff">
      		<div v-for="(item, index) in navInfo" :key="index">
      			<!-- 没有子列表的 -->
      			<el-menu-item v-if="!item.children || item.children.length === 0" :index="item.id" @click="link(item)">
	      			<i :class="item.icon"></i>
	      			<template slot="title">{{ item.label }}</template>
	      		</el-menu-item>
				<!-- 有子列表的 -->
	      		<el-submenu v-else :index="item.id">
	      			<template slot="title">
	      				<i :class="item.icon" v-if="item.icon"></i>
	          			<span>{{ item.label }}</span>
	        		</template>
	          		<el-menu-item v-for="(_item, _index) in item.children" :index="_item.id" :key="_index" @click="link(_item)">
	          			<i :class="_item.icon" v-if="_item.icon"></i>
	          			{{ _item.label }}
	          		</el-menu-item>
	      		</el-submenu>
      		</div>	
    	</el-menu>
	</div>
</template>
<script>
import { ajaxGet } from '@/utils/interceptor'
import { setCookie, getCookie, delCookies } from '@/utils/cookies'
import { mapGetters } from 'vuex'
export default {
	mounted () {
		this.getLeftNav()
	},
	data () {
		return {
			activeIndex: getCookie('leftNavIndex') || '0',
			navInfo: []
		}
	},
	computed: {
		...mapGetters(['leftNavInfo'])
	},
	methods: {
		getLeftNav (module = window.sessionStorage.getItem('currentModule') || '1') {
			this.navInfo = []
			ajaxGet('/left-nav', {module: module}).then(res => {
				if (res.data.code === 200) {
					delCookies('leftNavIndex')
					this.navInfo = res.data.body
				}
			})
		},
		handleOpen () {
			console.log('open')
		},
		handleClose () {
			console.log('close')
		},
		link (item) {
			console.log(item)
			if (item.url) {
				setCookie('leftNavIndex', item.id)
				this.$router.push(item.url)
			} else {
				console.log(item.url)
			}
		}
	},
	watch: {
		leftNavInfo () {
			this.getLeftNav()
		}
	}
}
</script>
<style scoped lang="less">
	.left-nav {
		width: 100%;
		height: 100%;
		background: #e6e6e6;
	}
	.el-submenu .el-menu-item {
		min-width: 0;
	}
	.el-menu {
		border-right: 0;
	}
</style>