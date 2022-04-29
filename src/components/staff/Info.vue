<template>
  <div>
    <el-input clearable placeholder="请输入姓名" style="width:300px;margin-left:5px;margin-bottom:10px" v-model="filterName" @:onchange="filterNames()"></el-input>
    <el-button type="primary" icon="el-icon-plus" @click="addStaffInfo()" value="添加职员" >添加职员</el-button>
      <el-table
    :data="filterStaffInfo.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    border
    style="width: 100%;"
    height="600">
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
        <el-table-column
      prop="sex"
      label="性别"
      width="120">
    </el-table-column>
        <el-table-column
      prop="age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
      prop="marry"
      label="婚姻状况"
      width="120">
    </el-table-column>
    <el-table-column
      prop="department"
      label="部门"
      width="120">
    </el-table-column>
    <el-table-column
      fixed:right
      prop="date"
      label="入职日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
      <el-table-column
      prop="Tnumber"
      label="手机号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="IDnumber"
      label="身份证号"
      width="250">
    </el-table-column>
    <el-table-column
      prop="identity"
      label="身份"
      width="120">
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="150" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="编辑"
  :visible.sync="dialogVisible"
  width="30%">
  <el-tag>姓名</el-tag>
  <el-input v-model="row.name" size=small></el-input><br>
  <el-tag>性别</el-tag>
  <el-select v-model="row.sex" size=small>
    <el-option value='男'></el-option>
    <el-option value='女'></el-option>
  </el-select><br>
  <el-tag>年龄</el-tag>
  <el-input v-model="row.age" size=small></el-input><br>
  <el-tag>婚姻状况</el-tag>
  <el-select v-model="row.marry" size=small>
    <el-option value='已婚'></el-option>
    <el-option value='未婚'></el-option>
  </el-select><br>
  <el-tag>部门</el-tag>
  <el-select v-model="row.department" size=small>
    <el-option value='研发部'></el-option>
    <el-option value='财务部'></el-option>
    <el-option value='董事会'></el-option>
    <el-option value='人事部'></el-option>
    <el-option value='市场部'></el-option>
    <el-option value='生产部'></el-option>
  </el-select><br>
  <el-tag>入职日期</el-tag>
  <el-date-picker
      v-model="row.date"
      size="small"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  <el-tag>手机号</el-tag>
  <el-input v-model="row.Tnumber" size=small></el-input><br>
  <el-tag>身份证号</el-tag>
  <el-input v-model="row.IDnumber" size=small></el-input><br>
  <el-tag>身份</el-tag>
  <el-select v-model="row.identity" size=small>
    <el-option value='党员'></el-option>
    <el-option value='团员'></el-option>
    <el-option value='--'></el-option>
  </el-select><br>
  <span slot="footer" class="dialog-footer">
    <el-button @click="unUpdateStaffInfo()">取 消</el-button>
    <el-button type="primary" @click="updateStaffInfo()">确 定</el-button>
  </span>
</el-dialog>
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="staffInfo.length">
    </el-pagination>
  </div>
</template>

<script>
import { staffInfo, staffInfo2 } from '@/api/staff'
export default {
  data () {
    return {
      filterName: '',
      pageSize: 10,
      currentPage: 1,
      staffInfo: [],
      filterStaffInfo: [],
      dialogVisible: false,
      buttonVal: '',
      index: '',
      row: {
        name: '',
        sex: '',
        age: '',
        marry: '',
        department: '',
        date: '',
        Tnumber: '',
        IDnumber: '',
        identitf: '' }
    }
  },
  created () {
    this.getStaffInfo()
  },
  watch: {
    filterName (newname, oldname) {
      this.filterNames()
    }
  },
  methods: {
    async  getStaffInfo () {
      let t1 = new Date().getTime()
      const res = await staffInfo()
      let t2 = new Date().getTime()
      console.log(t2 - t1)
      let t4 = new Date().getTime()
      this.staffInfo = res.staffInfo
      let t3 = new Date().getTime()
      console.log(t3 - t4)
      // 深拷贝是为了搜索时不改变原数据
      this.filterStaffInfo = JSON.parse(JSON.stringify(this.staffInfo))
    },
    handleEdit (index, row) {
      this.index = index
      this.dialogVisible = true
      this.buttonVal = '编辑'
      this.row = Object.assign({}, row)
    },
    updateStaffInfo () {
      if (this.buttonVal === '编辑') {
        for (let i = 0; i < this.staffInfo.length; i++) {
          if (this.staffInfo[i].name === this.row.name) {
            this.index = i
            console.log(i)
          }
        }
        this.staffInfo.splice(this.index, 1, this.row)
        this.filterStaffInfo.splice(this.index, 1, this.row)
        this.filterName = ''
        this.$notify({
          title: '成功',
          message: '编辑成功',
          duration: 1000,
          type: 'success'
        })
        staffInfo2(this.row).then(res => {

        })
      } else if (this.buttonVal === '添加职员') {
        this.staffInfo.push(this.row)
        this.filterStaffInfo.push(this.row)
        this.$notify({
          title: '成功',
          message: '添加成功',
          duration: 1000,
          type: 'success'
        })
      }
      this.dialogVisible = false
    },
    unUpdateStaffInfo () {
      this.dialogVisible = false
    },
    handleDelete (index, row) {
      for (let i = 0; i < this.staffInfo.length; i++) {
        if (this.staffInfo[i].name === row.name) {
          this.index = i
          console.log(i)
        }
      }
      this.staffInfo.splice(this.index, 1)
      this.filterStaffInfo.splice(this.index, 1)
      console.log(this.index)
      this.filterName = ''
      this.$notify({
        title: '成功',
        message: '删除成功',
        duration: 1000,
        type: 'success'
      })
    },
    filterNames () {
      let tt1 = new Date().getTime()
      this.filterStaffInfo = this.staffInfo.filter((index) => {
        return index.name.includes(this.filterName)
      })
      let tt2 = new Date().getTime()
      console.log(tt2 - tt1)
    },
    addStaffInfo () {
      this.dialogVisible = true
      this.buttonVal = '添加职员'
    }
  }

}
</script>
<style scoped>
.el-tag{
  width: 20%;
  margin-top: 10px;
}
.el-input,.el-select, .el-date-picker{
  margin-left: 5%;
  margin-top: 10px;
  width: 70%;

}
.el-table{
  text-align: center;
}
.el-pagination{
  width: 300px;
  margin:50px auto;

}
</style>
