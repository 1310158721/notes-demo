import axios from 'axios'
import qs from 'qs'
import { getCookie } from '@/utils/cookies'

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'https://notes.tanglihe.cn/api'
axios.defaults.timeout = 10000 // 最大响应时间，超过则取消该请求

// 过滤请求参数，将参数的键为空字符串('')的, 
// 或者参数的值为 null(空值)，undifined(未定义)的，都过滤掉，不传递给api
const filterData = data => {
	let params = {}
	if (data) {
		for (var i in data) {
			if (i.length !== 0 && data[i] !== null && data[i] !== undefined) {
				params[i] = data[i]
			}
		}
	}
	return params
}

// 请求拦截器
axios.interceptors.request.use(config => {
	// 请求方式为post的话， 要通过插件qs对参数进行序列化
	// 使config.data变成这样的格式 userName=tang&password=123456
	if (config.method === 'post') {
		config.data = qs.stringify(filterData(config.data))
	}
	return config
})

// 封装 axios get 请求
export const ajaxGet = (url, params = {}) => {
	return new Promise(resolve => {
		axios.get(url, {params: params}).then(res => {
			resolve(res)
		}).catch(err => {
			console.log(err)
		})
	})
}

// 封装 axios post 请求
export const ajaxPost = (url, params = {}) => {
	return new Promise(resolve => {
		axios.post(url, params).then(res => {
			resolve(res)
		}).catch(err => {
			console.log(err)
		})
	})
}