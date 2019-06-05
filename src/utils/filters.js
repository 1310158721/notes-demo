import Vue from 'vue'

// 格式化时间
Vue.filter('formatDate', function (val) {
	return new Date(val).toLocaleString()
})