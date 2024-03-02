<template>
  <div class="imgInputWrap">
    <VueImgInputer
      :bottom-text="bottomText"
      :hover-text="hoverText"
      :img-src="imgSrc"
      :placeholder="placeholder"
      :size="size"
      :style="imgStyle"
      accept="image/*"
      custom-icon-class="fa fa-image"
      theme="light"
      :max-size="10240"
      auto-upload
      :headers="headers"
      :action="uploadAction"
      :on-success="success"
      :on-error="error"
    />
    <div class="urlInputBox" @click="editUrl">
      <i class="el-icon-camera" />
    </div>
  </div>
</template>
<script>
/**
 * 海报图片上传
 * project XyLive_FE
 * Modified by @author xuhang
 * Created by @author Xytoki
 */

import VueImgInputer from 'vue-img-inputer'
import { MessageBox } from 'element-ui'
import {configLoader} from "@/main";

export default {
  components: { VueImgInputer },
  props: {
    imgStyle: {
      default: '',
      type: String
    },
    bottomText: {
      default: '点击或拖拽图片以修改',
      type: String
    },
    hoverText: {
      default: '点击或拖拽图片以修改',
      type: String
    },
    placeholder: {
      default: '点击或拖拽选择图片',
      type: String
    },
    size: {
      default: 'small',
      type: String
    },
    value: {
      default: '',
      type: String
    },
    thumb: {
      default: '',
      type: String
    },
    icon: {
      default: '',
      type: String
    },
    aliIcon: {
      default: '',
      type: String
    },
    customIconClass: {
      default: '',
      type: String
    },
    requestUrl: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      uploadAction: '',
      headers: {}
    }
  },
  computed: {
    imgSrc() {
      return this.value
    }
  },
  created() {
    this.uploadAction = configLoader.baseUrl + '/cat/uploadPoster'
    this.headers = {
      'Access-Control-Allow-Origin': '* '
    }
  },
  methods: {
    editUrl: function() {
      const that = this
      MessageBox.prompt('', '', {
        inputValue: that.value,
        center: true
      })
        .then(function(e) {
          that.$emit('input', e.value)
        })
        .catch(function() {
        })
    },
    success(data) {
      // 更新手动输入按钮里面的URL
      this.$emit('input', configLoader.baseUrl + data.posterUrl)
      this.$message.success('上传成功, 保存后生效')
    },
    error() {
      this.$message.error('出现了一个错误, 请找个人来修')
    }
  }
}
</script>
<style scoped>
.urlInputBox {
  display: inline-block;
  vertical-align: top;
}
</style>
<style lang="scss">
.img-inputer {
  position: relative;
  display: inline-block;
  width: 260px;
  height: 150px;
  border-radius: 5px;
  background: #f0f0f0;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
  0 1px 4px rgba(0, 0, 0, 0.117647);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &--small {
    width: 160px;
    height: 100px;

    .img-inputer__placeholder {
      font-size: 12px;
      top: 65%;
    }

    .img-inputer__icon {
      font-size: 28px !important;
      top: 38%;
    }
  }

  &--large {
    width: 460px;
    height: 250px;
  }

  &:hover {
    transform: scale(1.015);
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  }

  &.nhe:hover {
    transform: scale(1);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
  }

  &--light {
    background: #DCDFE6;
    border: 1px solid #DCDFE6;
    box-shadow: none;

    .img-inputer__icon {
      color: #DCDFE6;
    }

    &:hover {
      transform: scale(1);
      box-shadow: none;
      border-color: #DCDFE6;
    }
  }

  &--loading {
    overflow: hidden;

    &:hover {
      transform: scale(1);
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
      0 1px 4px rgba(0, 0, 0, 0.117647);
    }
  }

  &__loading {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 11;
    background: mix(black, transparent, 50);

    &-indicator {
      position: absolute;
      z-index: 2;
      top: 13px;
      left: 13px;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      border: 2px solid #fff;
      border-left-color: transparent;
      animation: vip-spin 0.5s linear infinite;
    }

    &-process {
      width: 100%;
      height: 100%;
      background: mix(#00ffc2, transparent, 26);
      transform: translate3d(-100%, 0, 0);
      transition: 0.1s linear;
    }
  }

  &__state {
    position: absolute;
    top: 13px;
    left: 13px;
    border-radius: 50%;
    width: 16px;
    z-index: 2;
    height: 16px;

    &.success {
      background: rgb(16, 201, 77);

      &::after {
        position: absolute;
        content: "";
        top: 5px;
        left: 3px;
        width: 10px;
        height: 5px;
        box-shadow: 4px 0 0 -2px #fff inset, 0 -4px 0 -2px #fff inset;
        transform: translateY(-0.5px) rotate(-45deg);
      }
    }

    &.fail {
      background: #e55;

      &::after,
      &::before {
        position: absolute;
        content: "";
        display: block;
        width: 8px;
        height: 2px;
        background: #fff;
        top: 50%;
        left: 50%;
      }

      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  > i {
    position: absolute;
    font-size: 34px !important;
    left: 50%;
    top: 40%;
    color: #757575;
    transform: translate(-50%, -50%);
  }

  &__placeholder {
    position: absolute;
    margin: 0;
    font-size: 14px;
    width: 100%;
    color: #DCDFE6;
    top: 62%;
    text-align: center;
  }

  &__preview-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 5px;
    overflow: hidden;
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(
        45deg,
        #aaa 25%,
        transparent 0,
        transparent 75%,
        #aaa 0,
        #aaa
    ),
    linear-gradient(45deg, #aaa 25%, #fff 0, #fff 75%, #aaa 0, #aaa);
  }

  &__preview-img {
    position: relative;
    top: 0;
    z-index: 2;
    width: 100%;
  }

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-bottom: 0;

    &:hover {
      ~ .img-inputer__mask {
        display: block;
      }
    }
  }

  &__inputer {
    position: absolute;
    left: -9999px;
  }

  &__mask {
    display: none;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    text-align: center;
    background: rgba(0, 0, 0, 0.22);
  }

  &__file-name {
    color: white;
    font-size: 13px;
    padding-top: 10px;
    margin: 0;
    display: inline-block;
    max-width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__change {
    position: absolute;
    bottom: 0;
    margin: 0;
    font-size: 12px;
    border-radius: 0 0 5px 5px;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: white;
    width: 100%;
    padding: 9px 0;
  }

  &__err {
    color: #e55;
    font-size: 12px;
    position: absolute;
    bottom: -28px;
    width: 100%;
  }
}

@keyframes vip-spin {
  to {
    transform: rotate(360deg);
  }
}

.vip-move-in {
  &-enter-active,
  &-leave-active {
    transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: trnsform;
  }

  &-enter,
  &-leave-active {
    opacity: 0;
    transform: translateX(30%);
  }
}

.vip-zoom-in {
  &-enter-active,
  &-leave-active {
    transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    will-change: trnsform;
  }

  &-enter,
  &-leave-active {
    transform: scale(0);
  }
}

.vip-fade {
  &-enter-active,
  &-leave-active {
    transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
  }

  &-enter,
  &-leave-active {
    opacity: 0;
  }
}

.urlInputBox {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 22px;
  text-align: center;
  vertical-align: middle !important;
  z-index: 20;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;

  &:hover {
    background: #fff;
    color: #000;
  }
}

.imgInputWrap {
  position: relative;
  display: inline-block;
}
</style>
