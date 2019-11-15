import Quill from 'quill'

const BlockEmbed = Quill.import('blots/block/embed')

class Divider extends BlockEmbed {
  static create() {
    const node = super.create()
    return node
  }
}

Divider.blotName = 'divider'
Divider.tagName = 'HR'

export default Divider