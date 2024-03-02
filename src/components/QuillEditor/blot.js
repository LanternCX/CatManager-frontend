/**
 * 富文本编辑器二开模块
 * project XyLive_FE
 * Modified by @author xuhang
 * Created by @author Xytoki
 */

export default function(Quill) {
  // 引入源码中的BlockEmbed
  const BlockEmbed = Quill.import('blots/block/embed')

  // 定义新的blot类型
  class RichContent extends BlockEmbed {
    static create(value) {
      const node = super.create(value)
      node.innerHTML = this.transformValue(value)
      return node
    }

    static transformValue(value) {
      let handleArr = value.split('\n')
      handleArr = handleArr.map(e =>
        e.replace(/^[\s]+/, '').replace(/[\s]+$/, '')
      )
      return handleArr.join('')
    }

    // 返回节点自身的value值 用于撤销操作
    static value(node) {
      return node.innerHTML
    }
  }

  // blotName
  RichContent.blotName = 'RichContent'
  // 用于匹配blot名称
  RichContent.className = 'rich-innerHtml'
  // 标签类型自定义
  RichContent.tagName = 'section'
  Quill.register(RichContent, true)
}
