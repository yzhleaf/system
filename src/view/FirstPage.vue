<template>
  <el-container>
  <el-header>
    <i class="el-icon-s-unfold" v-if="isCollapse" @click="open" style="font-size:200%"></i>
    <i class="el-icon-s-fold" v-if="!isCollapse" @click="open" style="font-size:200%"></i>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-user-solid"></i>
      <span slot="title">员工管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/Info">基础信息</el-menu-item>
      <el-menu-item index="/Salary">薪资管理</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
    <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
    </el-menu-item-group>
  </el-submenu>

</el-menu>

    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    open () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
