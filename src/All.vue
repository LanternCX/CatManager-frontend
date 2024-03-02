<template>
  <div id="all">
    <el-page-header @back="exit" title="返回首页" content="厦一海沧 | 校园流浪猫管理系统" style="margin-bottom: 10px;" />
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane  label="猫猫列表" name="catList">
        <cat ref="catList"></cat>
      </el-tab-pane>
    </el-tabs>
    <div class="copyrightAll">
      <div class="c_top">
        <div class="cx">Made<br>with gay<br>Powered by Li&Wu</div>
      </div>
      <div>2023.02 v1.0</div>
    </div>
  </div>
</template>

<script>
import {removeToken} from "@/cookieManager";
import cat from "@/components/Cat"

export default {
  name: 'CatTAll',
  components: {
    cat
  },
  data() {
    return {
      list: [],
      activeName: 'catList'
    };
  },
  created() {
  },
  methods: {
    exit() {
      removeToken()
      this.$router.push("/login")
      this.$notify({
        title: '再见',
        type: 'warning'
      })
    }
  }
}
</script>
<style>
#all {
  margin: 25px;
}

.cx {
  font-size: 15px;
  padding-left: 15px;
  padding-top: 5px;
}

.copyrightAll {
  margin-top: 15px;
  user-select: none;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #555;
}

.c_top {
  display: inline-block;
  height: 70px;
  padding-top: 19px;
  padding-left: 75px;
  font-size: 17px;

  vertical-align: top;
  background: url(~@/assets/images/cx.png) no-repeat left center;
  background-size: contain;
}
</style>
