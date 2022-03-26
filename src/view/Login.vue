<template>
    <el-container>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-unlock" v-model="ruleForm.password"></el-input>
        </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
  </el-form-item>
</el-form>
</el-container>
</template>
<script>
// import axios from 'axios'
import {login} from '@/api/login'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { min: 3, max: 5, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // axios.get('/static/login.json').then(res => { console.log(res) })
      login().then(res => {
        if (res.data.code === 2000) {
          this.$router.push('FirstPage')
        }
      }
      )
    }
  }
}
</script>
<style scoped>
.el-container{
  height: 100vh;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/backgrand.jpg');
}
.el-form{
  height: 40vh;
  width: 30vw;
}
</style>
