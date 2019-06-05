import echarts from 'echarts'

// 折线图，接收dom元素，横坐标数据，纵坐标数据作为参数
export const polygonal_line = (dom, countData, nameData) => {
	setTimeout(() => {
		var myChart = echarts.init(document.getElementById(dom))
		var option = {
			tooltip: {
				formatter: function (params) {
					return `<div style="padding: 5px 10px;">
						<p>类型: ${params.name}</p>
						<p>条数: ${params.value}</p>
					</div>`
				} 
			},
		    xAxis: {
		        type: 'category',
		        data: nameData
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
			    {
			        data: countData,
			        type: 'line'
			    }
		    ]
		}
		myChart.setOption(option)
	}, 20)
}