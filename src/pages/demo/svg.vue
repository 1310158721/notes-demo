<template>
	<div class="container_wrapper">
		<p class="page-title">svg 使用总结</p>
		<div class="add-wrap rel mb14" style="height: 32px;">
			<el-button class="addBtn" type="primary" size="small" @click.stop="addItem">添加</el-button>
		</div>
		<el-card class="box-card card">
			<div v-if="listInfo">
				<el-collapse accordion>
				  <el-collapse-item v-for="(item, index) in listInfo.records" :key="index">
				    <template slot="title">
				    	<div class="wrap rel">
				    		<div style="width: 10%;">{{ item.id }}.</div>
				    		<div style="width: 40%;">{{ item.title }}</div>
				    		<div style="width: 30%;">{{ item.date | formatDate }}</div>
				    		<div class="abs" style="width: 127px; right: 40px;">
				    			<el-button class="editBtn" type="primary" size="mini" @click.stop="editItem(item._id)">修改</el-button>
				    			<el-button class="delBtn" type="primary" size="mini" @click.stop="delItem(item._id)">删除</el-button>
				    		</div>
				    	</div>
				    </template>
				    <pre v-text="item.content"></pre>
				  </el-collapse-item>
				</el-collapse>
				<div class="rel mt28 pagination-wrap">
					<el-pagination
					  class="pagination"
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="listInfo.currentPage"
				      :page-sizes="[10, 20, 50, 100]"
				      :page-size="listInfo.currentSize"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="listInfo.totalrecord">
				    </el-pagination>
				</div>
			</div>
			<p v-else>该类型暂无数据</p>
		</el-card>
		<div class="alert_wrapper">
			<!-- 添加item弹窗界面 -->
			<el-dialog
				title="添加列表item"
				:visible.sync="addAlert"
				:before-close="addHandleClose"
				width="50%">
				<el-form :model="addPostData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="标题" prop="title">
				    <el-input v-model="addPostData.title"></el-input>
				  </el-form-item>
				  
				  <el-form-item label="内容" prop="content">
				    <el-input type="textarea" rows="15" v-model="addPostData.content"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="addSubmitForm('ruleForm')">立即添加</el-button>
				    <el-button @click="addRresetForm('ruleForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</el-dialog>
			<!-- 删除item弹窗界面 -->
			<el-dialog
				title="确定删除吗？"
				:visible.sync="delAlert"
				width="50%">
				<span slot="footer" class="dialog-footer">
				 	<el-button size="mini" @click="delAlert = false">取 消</el-button>
				 	<el-button size="mini" type="primary" @click="delSure">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 修改item弹窗界面 -->
			<el-dialog
				title="修改列表item"
				:visible.sync="editAlert"
				:before-close="editHandleClose"
				width="50%">
				<el-form :model="editPostData" :rules="rules" ref="edit_ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="标题" prop="title">
						<el-input v-model="editPostData.title"></el-input>
					</el-form-item>
					<el-form-item label="内容" prop="content">
						<el-input type="textarea" rows="15" v-model="editPostData.content"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="editSubmitForm('edit_ruleForm')">修改</el-button>
						<el-button @click="editReset('edit_ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import { ajaxGet, ajaxPost } from '@/utils/interceptor'
import { polygonal_line } from '@/utils/getCharts'
export default {
	mounted () {
		this.getList()
	},
	data () {
		return {
			tabs: [
				{name: '1', label: 'ES5'},
				{name: '2', label: 'ES6'},
				{name: '3', label: 'all'},
				{name: '4', label: '图表展示'}
			],
			listPostData: {
				currentPage: 1,
				currentSize: 10
			},
			rules: {
	        	title: [
		        	{ required: true, message: '标题不能为空白', trigger: 'blur' },
		        	{ min: 0, message: '内容不能为空白', trigger: 'blur' }
		        ],
		        content: [
		        	{ required: true, message: '内容不能为空白', trigger: 'blur' }
		        ]
		    },
			listInfo: null,
			addAlert: false,
			addPostData: {
				type: '1',
				title: '',
				content: ''
			},
			delAlert: false,
			delId: '',
			editAlert: false,
			editPostData: {
				type: '',
				title: '',
				content: ''
			},
			editId: '',
			tableData: null,
			chartsData: []
		}
	},
	methods: {
		getList () {
			ajaxGet('/svgGetList', this.listPostData).then(res => {
				if (res.data.code === 200) {
					this.listInfo = res.data.body
					if (this.listPostData.type === '4' && this.listInfo) {
						this.tableData = this.screenToObject(this.listInfo.records)
						this.chartsData = this.screenToArray(this.listInfo.records)
						let nameData = ['内部模块', '外部模块', '所有模块']
						polygonal_line('main', this.chartsData, nameData)
					}
				}
			})
		},
		addListItem () {
			ajaxPost('/svgAddItem', this.addPostData).then(res => {
				if (res.data.code === 200) {
					this.addAlert = false
					this.getList()
				}
			})
		},
		delListItem (_id) {
			ajaxGet('/svgDelItem', {_id: _id}).then(res => {
				if (res.data.code === 200) {
					this.$message.success(res.data.message)
					this.delAlert = false
					this.getList()
				} else {
					this.$message.error(res.data.message)
				}
			})
		},
		getSingleItem (_id) {
			ajaxGet('/svgSingleItem', {_id: _id}).then(res => {
				if (res.data.code === 200) {
					this.editPostData.type = res.data.body[0].type
					this.editPostData.title = res.data.body[0].title
					this.editPostData.content = res.data.body[0].content
					this.editAlert = true
	    			this.editId = _id
				}
			})
		},
		editListItem (_id) {
			ajaxPost('/svgEditItem', {_id: _id, title: this.editPostData.title, content: this.editPostData.content, type: this.editPostData.type}).then(res => {
				if (res.data.code === 200) {
					this.getList()
					this.editAlert = false
				}
			})
		},
		handleSizeChange (val) {
			this.listPostData.currentSize = val
			this.getList()
		},
		handleCurrentChange (val) {
			this.listPostData.currentPage = val
			this.getList()
		},
		addItem () {
			this.addPostData.title = ''
			this.addPostData.content = ''
			this.addAlert = true
		},
		addHandleClose () {
			this.addResetForm('ruleForm')
	    	this.addAlert = false
		},
		addRresetForm(formName) {
	      	this.$refs[formName].resetFields()
	    },
		addResetForm(formName) {
	      	this.$refs[formName].resetFields()
	    },
	    addSubmitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
	    		if (valid) {
	    		  	this.addListItem()
	    		} else {
	    		  	return false
	    		}
	    	})
	    },
	    delItem (_id) {
			this.delId = _id
			this.delAlert = true
		},
		delSure () {
			this.delListItem(this.delId)
		},
		editItem (_id) {
			this.getSingleItem(_id)
		},
		editHandleClose () {
			this.editResetForm('edit_ruleForm')
	    	this.editAlert = false
	    	this.editPostData.tpye = ''
	    	this.editPostData.title = ''
	    	this.editPostData.content = ''
		},
		editSubmitForm (formName) {
			this.$refs[formName].validate((valid) => {
	    		if (valid) {
	    		  	this.editListItem(this.editId)
	    		} else {
	    		  	return false
	    		}
	    	})
		},
		editResetForm(formName) {
	      	this.$refs[formName].resetFields()
	    },
		editReset (ref) {
			this.editResetForm(ref)
	    	this.editPostData.tpye = ''
	    	this.editPostData.title = ''
	    	this.editPostData.content = ''
		},
		screenToArray (arr) {
			if (arr.length === 0) {
				return []
			} else {
				let result = []
				const type1 = arr.filter(item => item.type === '1').length
				const type2 = arr.filter(item => item.type === '2').length
				const type3 = type1 + type2
				return [type1, type2, type3]
			}
		},
		screenToObject (arr) {
			if (arr.length === 0) {
				return []
			} else {
				let result = []
				const type1 = arr.filter(item => item.type === '1').length
				const type2 = arr.filter(item => item.type === '2').length
				const type3 = type1 + type2
				return [{
					type1: type1,
					type2: type2,
					type3: type3
				}]
			}
		}
	},
	watch: {
		'listPostData.type' () {
			this.getList()
		}
	}
}
</script>
<style scoped lang="less">
	@m_w: 700px;

	.container_wrapper {
		width: 100%;
		min-width: @m_w;
	}
	.add-wrap {
		width: 100%;
		height: 32px;
		.addBtn {
			float: right;
		}
	}
	.wrap {
		width: 100%;
		height: 100%;
		font-size: 0;
		div {
			font-size: 14px;
			height: 100%;
			display: inline-block;
			overflow: hidden;
		}
	}
	.pagination-wrap {
		height: 32px;
		.pagination {
			float: right;
		}
	}
</style>
