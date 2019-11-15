import Quill from 'quill'

export default class Divider {
  constructor(quill) {
    this.quill = quill
    this.toolbar = quill.getModule('toolbar')
    if (typeof this.toolbar !== 'undefined') {
      this.toolbar.addHandler('divider', this.insertDivider)
    }
  }

  insertDivider() {
    const { index } = this.quill.getSelection(true)
    this.quill.insertText(index, '\n', Quill.sources.USER)
    this.quill.insertEmbed(index + 1, 'divider', true, Quill.sources.USER)
    this.quill.setSelection(index + 2, Quill.sources.SILENT)
  }
}
