// 设置
export const setCookie = (name, value, hours = 2) => { 
    var exp = new Date()
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * hours)
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()
}

// 获取
export const getCookie = name => {
	const reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)")
	const arr = document.cookie.match(reg)
	if (arr) {
		return unescape(arr[2])
	} else {
		return null
	}
}

// 删除
export const delCookies = name => {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval=getCookie(name)
    if(cval!=null) {
    	document.cookie= name + "="+cval+";expires="+exp.toGMTString()  
    }
} 
