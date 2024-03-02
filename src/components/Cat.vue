<template>
  <div v-loading="mainLoading" class="page">
    <el-popover v-model="showCreate" placement="bottom" width="200">
      <el-input v-model="createName" placeholder="猫猫名称" />
      <br><br>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="showCreate = false;createName=''">取消</el-button>
        <el-button :loading="createLoading" size="mini" type="primary" @click="doCreate(createName);">确定</el-button>
      </div>
      <el-button slot="reference" style="float:right">添加猫猫</el-button>
    </el-popover>
    <el-card v-for="i in list" :key="i.id" :body-style="{ padding: '0px' }" class="actCard">
      <div class="imgbox">
        <img :src="i.poster" class="card-image" alt="海报">
      </div>
      <h4 class="card-title">
        {{ i.name }}
      </h4>
      <div class="card-bottom" @click="openInfoPanel(i)">
        <a class="el-button button el-button--primary el-button--medium" style="width: 100%;">
          <span>查看猫猫</span>
        </a>
      </div>
      <el-button class="little-el-btn" type="info" plain size="mini" @click="openEditPanel(i)">编辑数据</el-button>
      <el-popconfirm
          confirm-button-type="danger"
          confirm-button-text='删除'
          cancel-button-text='不用了'
          icon="el-icon-info"
          icon-color="red"
          title="删除猫猫？"
          content="删除后猫猫将永远无法找回(真的很久)"
          @confirm="doDelete(i.id);"
      >
        <el-button class="little-el-btn"  slot="reference" type="danger" plain size="mini">删除猫猫</el-button>
      </el-popconfirm>
    </el-card>
    <el-drawer :size="windowWidth < 700 ? '100%' : '50%'" :visible.sync="editPanelVisible">
      <el-card>
        <h2>编辑猫猫信息</h2>
        <el-form>
          <el-form-item label="猫猫照片">
            <image-input v-model="catNowEdit.poster" size="medium" />
          </el-form-item>
          <el-form-item label="猫猫名称">
            <el-input v-model="catNowEdit.name"></el-input>
          </el-form-item>
          <el-form-item label="活动介绍">
            <quill-editor
                v-model="catNowEdit.description"
                style="height: 300px;"
                @updateRawContent="updateRawHtml"
            />
          </el-form-item>
          <el-form-item label="猫猫发现地点">
            <el-input v-model="catNowEdit.location"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="editPanelVisible = false">取 消</el-button>
        <el-button type="primary"  @click="doEdit()">确 定</el-button>
      </el-card>
    </el-drawer>
    <el-drawer :size="windowWidth < 700 ? '100%' : '50%'" :visible.sync="infoPanelVisible">
      <h2>猫猫信息</h2>
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="font-size: 20px;">
          <span>{{ catNowEdit.name }}</span>
        </div>
        <div />
        <div  class="artplayer-app" style="width:100%;" />
        <h3>照片</h3>
        <el-image  :src="catNowEdit.poster" style="width: 100%;height: 100%" />
        <h3>发现地点: {{catNowEdit.location}}</h3>
        <h3>简介</h3>
        <quill-editor v-model="catNowEdit.description"></quill-editor>
      </el-card>
    </el-drawer>
  </div>
</template>
<script>
import request from "@/request";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import ImageInput from '@/components/ImageInput'
import quillEditor from "@/components/QuillEditor";

export default {
  name: 'Cat',
  data(){
    return{
      mainLoading: false,
      changed: false,
      list: [],
      editPanelVisible: false,
      infoPanelVisible: false,
      catNowEdit:{},
      rawContent:'',
      showCreate:false,
      showDelete:false,
      createName:'',
      createLoading:false,
      windowWidth: 114514,
      posterBlobLink: ''
    }
  },
  components: {
    quillEditor,
    ImageInput
  },
  created() {
    request({
      url: `/cat`,
      method: 'get'
    }).then(data =>{
      this.list = data.data.list
    })
    setInterval(() => {
      this.windowWidth = window.innerWidth
    }, 1000)
  },
  methods:{
    openEditPanel(cat){
      this.catNowEdit = cat
      this.editPanelVisible = true
    },
    openInfoPanel(cat){
      this.catNowEdit = cat
      this.infoPanelVisible = true
    },
    updateRawHtml(content) {
      this.rawContent = content
    },
    doDelete(id){
      request({
        url: `/cat/${id}`,
        method: 'delete'
      }).then(data => {
        this.list = data.data.list
      })
    },
    doCreate(name) {
      this.createLoading = true
      if (name === '' || name === null || name === undefined){
        this.$notify({
          title: '能不能填认真点',
          message: '猫猫名称不允许为空',
          type: 'error'
        })
        this.createLoading = false
        return
      }
      request({
        url: `/cat?name=${name}`,
        method: 'post'
      }).then(data =>{
        this.list.push(data.data.cat)
      })
      this.$notify({
        title: '创建成功！',
        message: '有新的猫猫加入大家庭哩！',
        type: 'success'
      })
      this.createLoading = false
    },
    doEdit(){
      if (this.catNowEdit.name === '' || this.catNowEdit.name === null || this.catNowEdit.name === undefined){
        this.$notify({
          title: '能不能填认真点',
          message: '猫猫名称不允许为空',
          type: 'error'
        })
        this.createLoading = false
        return
      }
      this.mainLoading = true
      this.editPanelVisible = false
      const data = this.catNowEdit
      request({
        url: `/cat/${this.catNowEdit.id}`,
        method: 'put',
        data
      }).then(data =>{
        this.list = data.data.list
      })
      this.editPanelVisible = false
      this.mainLoading = false
    }
  }
}
</script>
<style scoped>
.little-el-btn{
  margin: 0 5px 10px 5px;
}
.actCard {
  width: 322px;
  display: inline-block;
  margin: 10px;
  max-width: 90%;
  vertical-align: top;
}

.page {
  text-align: center;
}

.imgbox {
  width: 100%;
}

img.card-image {
  width: 320px;
  height: 213px;
}

h4.card-title {
  margin: -50px 0 0;
  vertical-align: bottom;
  padding-top: 27px;
  font-weight: normal;
  height: 25px;
  font-size: 18px;
  position: relative;
  background: linear-gradient(transparent, #FFF);
  color: #555;
}

.card-bottom {
  padding: 10px;
}

.card-title small{
  display: block;
  font-size: 12px;
  color: #888;
}

</style>

<style lang="scss" scoped>
.empty-media {
  position: relative;
  padding: 0 50px;
  overflow: hidden;
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
