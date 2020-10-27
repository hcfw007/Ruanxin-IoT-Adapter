<template>
  <el-container class="frame-container">
    <el-aside width="250px">
      <sidebar />
    </el-aside>
    <el-container>
      <el-header height="70px">
        <navbar />
      </el-header>
      <el-main>
        <Nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="stylus">
.frame-container
  width: 100vw
  height: 100vh
</style>
