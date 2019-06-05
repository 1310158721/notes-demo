<template>
	<div class="container_wrapper">
		<p class="page-title">随手记页面</p>
		<div class="add-wrap rel mb14" style="height: 32px;">
			<el-button class="addBtn" type="primary" size="small" @click.stop="addItem">添加</el-button>
		</div>
		<el-tabs v-model="listPostData.type" type="card">
		    <el-tab-pane v-for="(item, index) in tabs" :label="item.label" :name="item.name" :key="index"></el-tab-pane>
		</el-tabs>
		<el-card class="box-card card">
			<div v-if="listInfo">
				<el-table
			      :data="listInfo.records"
			      style="width: 100%">
			      <el-table-column
			        prop="id"
			        label="ID"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="content"
			        label="内容">
			      </el-table-column>
			      <el-table-column
			        prop="date"
			        label="日期"
			        width="200">
			      </el-table-column>
			      <el-table-column
			        label="操作"
			        width="180">
			        <template slot-scope="scope">
			        	<el-button v-if="scope.row.type === '1'" type="primary" size="mini" @click.stop="setReadStatus(scope.row)">置为已阅</el-button>
			        	<el-button v-if="scope.row.type === '2'" type="primary" size="mini" @click.stop="setReadStatus(scope.row)">置为未阅</el-button>
			        	<el-button type="primary" size="mini" @click.stop="delItem(scope.row)">删除</el-button>
			        </template>
			      </el-table-column>
			    </el-table>
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
		<div class="alert">
			<!-- 删除弹窗界面 -->
			<el-dialog
				title="确定删除吗？"
				:visible.sync="delAlert"
				width="50%">
				<span slot="footer" class="dialog-footer">
				 	<el-button size="mini" @click="delAlert = false">取 消</el-button>
				 	<el-button size="mini" type="primary" @click="delSure">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 添加item弹窗界面 -->
			<el-dialog
				title="添加列表item"
				:visible.sync="addAlert"
				:before-close="addHandleClose"
				width="50%">
				<el-form :model="addPostData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="内容" prop="content">
				    <el-input type="textarea" rows="15" v-model="addPostData.content"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="addSubmitForm('ruleForm')">立即添加</el-button>
				    <el-button @click="addRresetForm('ruleForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import { ajaxGet, ajaxPost } from '@/utils/interceptor'
export default {
	mounted () {
		this.getList()
	},
	data () {
		return {
			tabs: [
				{name: '1', label: '未阅'},
				{name: '2', label: '已阅'},
				{name: '3', label: '所有'}
			],
			listPostData: {
				type: '1',
				currentPage: 1,
				currentSize: 10
			},
			listInfo: null,
			readStatusPostData: {
				type: '',
				_id: ''
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
			delAlert: false,
			delId: '',
			addAlert: false,
			addPostData: {
				content: ''
			}
		}
	},
	methods: {
		getList () {
			ajaxGet('/recordsGetList', this.listPostData).then(res => {
				if (res.data.code === 200) {
					this.listInfo = res.data.body
				}
			})
		},
		changeReadStatus () {
			ajaxPost('/recordsChangeReadStatus', this.readStatusPostData).then(res => {
				if (res.data.code === 200) {
					this.$message.success(res.data.message)
					this.getList()
				} else {
					this.$message.error(res.data.message)
				}
			})
		},
		delListItem (_id) {
			ajaxGet('/recordsDelItem', {_id: _id}).then(res => {
				if (res.data.code === 200) {
					this.$message.success(res.data.message)
					this.delAlert = false
					this.getList()
				} else {
					this.$message.error(res.data.message)
				}
			})
		},
		addListItem () {
			ajaxPost('/recordsAddItem', this.addPostData).then(res => {
				if (res.data.code === 200) {
					this.addAlert = false
					this.getList()
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
		setReadStatus (row) {
			this.readStatusPostData.type = row.type
			this.readStatusPostData._id = row._id
			this.changeReadStatus()
		},
		delItem (row) {
			this.delId = row._id
			this.delAlert = true
		},
		delSure () {
			this.delListItem(this.delId)
		},
		addItem () {
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
