<template>
	<div>
		<div id="main" style="height:400px"></div>
	</div>
</template>
<script>
import echarts from 'echarts'
export default {
	mounted () {
		var myChart = echarts.init(document.getElementById('main'))
		var option = {
		    xAxis: {
		        type: 'category',
		        data: ['内部模块', '外部模块', '所有模块']
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [{
		        data: [1, 2, 3],
		        type: 'line'
		    }]
		}
		myChart.setOption(option)
	}
}
</script>
<style>
	
</style>