<template>
  <div>
    <quill-editor
      ref="quillComp"
      content=""
      :options="editorOption"
      style="height: 250px;"
      @change="onEditorChange"
      @ready="onEditorReady"
    />
  </div>
</template>
<script>
/**
 * 富文本编辑器二开模块
 * project XyLive_FE
 * Modified by @author xuhang
 * Created by @author Xytoki
 */

import * as Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import blotSelect from './blot'
import { quillEditor } from 'vue-quill-editor'

blotSelect(Quill)

export default {
  components: {
    quillEditor
  },
  props: {
    value: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [
                'bold',
                'italic',
                'underline',
                'strike',
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
                { align: [] }
              ],
              [{ color: [] }, { background: [] }],
              ['image']
            ]
          }
        }
      },
      prevValue: '',
      showFrame: false,
      init: false
    }
  },
  computed: {
    quill() {
      return this.$refs.quillComp.quill
    }
  },
  watch: {
    value(val) {
      if (this.prevValue) {
        return
      }
      this.onEditorReady(this.quill)
      this.prevValue = val
    }
  },
  methods: {
    onEditorReady(quill) {
      if (!this.init) {
        this.listenPaste()
        this.init = true
      }
      if (!this.value) return
      if (JSON.stringify(quill.getContents()) === this.value) return
      try {
        quill.setContents(JSON.parse(this.value))
      } catch (e) {
        quill.pasteHTML(this.value)
      }
    },
    onEditorChange(ev) {
      const delta = ev.quill.getContents()
      this.$emit('input', JSON.stringify(delta))
      this.$emit('updateRawContent', ev.html)
    },
    nodesInQuill(originNode) {
      for (let i = originNode.length - 1; i >= 0; i--) {
        // ignore comments
        if (originNode[i].nodeType === 8) {
          continue
        }
        if (originNode[i].localName === 'section') {
          // 秀米类型代码 走新blot
          this.setRichText(originNode[i].outerHTML)
        } else {
          // 正常插入
          this.quill.clipboard.dangerouslyPasteHTML(
            0,
            originNode[i].outerHTML
          )
        }
      }
      this.showFrame = false
    },
    // 监听粘贴板
    listenPaste() {
      this.quill.on('selection-change', () => {
        this.selection = this.quill.getSelection()
      })
      this.quill.root.addEventListener('paste', e => {
        // 获取粘贴板文本
        const msg = (e.clipboardData || window.clipboardData).getData(
          'text/html'
        )
        if (msg) {
          // 几个文章排版平台
          if (
            msg.includes('xiumi') ||
            msg.includes('ipaiban') ||
            msg.includes('135editor')
          ) {
            // 阻止复制动作
            e.preventDefault()
            e.stopPropagation()
            const dom = new DOMParser().parseFromString(
              msg,
              'text/html'
            );
            [...dom.getElementsByTagName('img')].forEach(a => {
              a.referrerPolicy = 'no-referrer'
            })
            // 根据不同标签，使用不同的插入方法
            this.nodesInQuill(dom.body.childNodes)
          }
        }
      })
    },
    setRichText(e) {
      this.quill.insertEmbed(this.selection.index || 0, 'RichContent', e)
    }
  }
}
</script>

<style lang="scss">
.ql-toolbar.ql-snow {
  line-height: normal;
}
.ql-toolbar.ql-snow .ql-formats {
  margin-right: 0;
}
</style>
