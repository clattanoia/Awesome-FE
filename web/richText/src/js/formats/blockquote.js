import Quill from 'quill'

const Block = Quill.import('blots/block')
const Container = Quill.import('blots/container')
const Parchment = Quill.import('parchment')

class BlockquoteItem extends Block {
  static formats(domNode) {
    return domNode.tagName === this.tagName ? undefined : super.formats(domNode)
  }

  format(name, value) {
    if (name === Blockquote.blotName && !value) {
      // 设置blockquote: 'false'，去掉blockquote样式
      this.replaceWith(Parchment.create(this.statics.scope))
    } else {
      // 设置blockquote: 'blockquote'，blockquote样式
      super.format(name, value)
    }
  }

  remove() {
    if (this.prev === null && this.next === null) {
      this.parent.remove()
    } else {
      super.remove()
    }
  }

  replaceWith(name, value) {
    this.parent.isolate(this.offset(this.parent, this.length()))
    if (name === this.parent.statics.blotName) {
      // enter添加blockquote-item时，将其放入一个blockquote中
      this.parent.replaceWith(name, value)
      return this
    } else {
      // 点击按键去掉样式时，将父元素展开，该行变成默认的p元素
      this.parent.unwrap()
      return super.replaceWith(name, value)
    }
  }
}

BlockquoteItem.blotName = 'blockquote-item'
BlockquoteItem.tagName = 'p'
BlockquoteItem.className = 'blockquote-item'

class Blockquote extends Container {
  static create() {
    const node = super.create()
    return node
  }

  // 继承container，没有formats，在toolbar中无法切换样式
  static formats(domNode) {
    return 'blockquote'
  }

  formats() {
    return {
      [this.statics.blotName]: this.statics.formats(this.domNode)
    }
  }

  // 前面插入：如果BlockquoteItem，直接插入，否则插入到Blockquote外部
  insertBefore(blot, ref) {
    if (blot instanceof BlockquoteItem) {
      super.insertBefore(blot, ref)
    } else {
      const index = ref === null ? this.length() : ref.offset(this)
      const after = this.split(index)
      after.parent.insertBefore(blot, after)
    }
  }

  // 如果下个元素与当前元素一样，则合并
  optimize(context) {
    super.optimize(context)
    const next = this.next
    if (
      next !== null &&
      next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName
    ) {
      next.moveChildren(this)
      next.remove()
    }
  }

  // 如果不是一种blot，则将target的内容移动到当前的blot中
  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      const item = Parchment.create(this.statics.defaultChild)
      target.moveChildren(item)
      this.appendChild(item)
    }
    super.replace(target)
  }
}

Blockquote.blotName = 'blockquote'
Blockquote.scope = Parchment.Scope.BLOCK_BLOT
Blockquote.tagName = 'blockquote'
Blockquote.defaultChild = 'blockquote-item'
Blockquote.allowedChildren = [BlockquoteItem]

export { BlockquoteItem, Blockquote as default }
