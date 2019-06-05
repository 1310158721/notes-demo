<template>
	<el-container class="containner bg">
	  	<el-header class="header">
	  		<v-header />
	  	</el-header>
	  	<el-container class="main-wrapper">
	    	<el-aside class="aside" width="200px">
	    		<left-nav />
	    	</el-aside>
	    	<el-main class="main">
	    		<router-view />
	    	</el-main>
	  	</el-container>
	</el-container>
</template>
<script>
import VHeader from '@/components/header'
import leftNav from '@/components/leftNav'
export default {
	components: {
		VHeader,
		leftNav
	}
}
</script>
<style scoped lang="less">
	.containner {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: #fff;
		.header {
			height: 80px !important;
			padding: 0px;
		}
		.main-wrapper {
			flex: 1;
			display: flex;
			flex-direction: row;
			padding: 0 !important;
			.aside {
				width: 200px !important;
			}
			.main {
				flex: 1;
				height: calc(100vh - 80px);
			}
		}
	}
</style>