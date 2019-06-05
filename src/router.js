import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: '/',
			redirect: '/nav/welcome'
		},
		{
			path: '/test',
			name: 'test',
			component: resolve => require(['@/pages/test'], resolve)
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/pages/login'], resolve)
		},
		{
			path: '/nav',
			name: 'nav',
			component: resolve => require(['@/pages/nav'], resolve),
			children: [
				// 欢迎页面---------------------------
				{
					path: 'welcome',
					name: 'welcome',
					component: resolve => require(['@/pages/welcome'], resolve)
				},
				// Node 模块---------------------------
				{
					path: 'node/modules',
					name: 'node/modules',
					component: resolve => require(['@/pages/node/modules'], resolve)
				},
				// Javascript 模块---------------------------
				{
					path: 'javascript/language',
					name: 'javascript/language',
					component: resolve => require(['@/pages/javascript/language'], resolve)
				},

				// Css 模块---------------------------
				{
					path: 'css/language',
					name: 'css/language',
					component: resolve => require(['@/pages/css/language'], resolve)
				},
				// Mvvm 模块---------------------------
				{
					path: 'mvvm/frames',
					name: 'mvvm/frames',
					component: resolve => require(['@/pages/mvvm/frames'], resolve)
				},
				// Record 模块---------------------------
				{
					path: 'records',
					name: 'records',
					component: resolve => require(['@/pages/records/records'], resolve)
				},
				// Demo 模块---------------------------
				{
					path: 'demo/canvas',
					name: 'demo/canvas',
					component: resolve => require(['@/pages/demo/canvas'], resolve)
				},
				{
					path: 'demo/svg',
					name: 'demo/svg',
					component: resolve => require(['@/pages/demo/svg'], resolve)
				},
				// Plugin 模块---------------------------
				{
					path: 'plugin/swiper',
					name: 'plugin/swiper',
					component: resolve => require(['@/pages/plugin/swiper'], resolve)
				},
				{
					path: 'plugin/iscroll',
					name: 'plugin/iscroll',
					component: resolve => require(['@/pages/plugin/iscroll'], resolve)
				}
			]
		}
	]
})