export default class UndoRedo {
  constructor(quill) {
    this.quill = quill
    this.toolbar = quill.getModule('toolbar')
    if (typeof this.toolbar !== 'undefined') {
      this.toolbar.addHandler('redo', this.redo)
      this.toolbar.addHandler('undo', this.undo)
    }
  }

  redo() {
    this.quill.history.redo()
  }

  undo() {
    this.quill.history.undo()
  }
}