export class ImageDrop {
  /**
   * Instantiate the module given a quill instance and any options
   * @param {Quill} quill
   * @param {Object} options
   */
  constructor(quill, options = {}) {
    // save the quill reference
    this.quill = quill
    // bind handlers to this instance
    this.handleDrop = this.handleDrop.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
    // listen for drop and paste events
    this.quill.root.addEventListener('drop', this.handleDrop, false)
    this.quill.root.addEventListener('paste', this.handlePaste, false)
  }

  /**
   * Handler for drop event to read dropped files from evt.dataTransfer
   * @param {Event} evt
   */
  handleDrop(evt) {
    evt.preventDefault()
    if (
      evt.dataTransfer &&
      evt.dataTransfer.files &&
      evt.dataTransfer.files.length
    ) {
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection()
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY)
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer,
            range.startOffset,
            range.startContainer,
            range.startOffset
          )
        }
      }
      this.readFiles(evt.dataTransfer.files, this.insert.bind(this))
    }
  }

  /**
   * Handler for paste event to read pasted files from evt.clipboardData
   * @param {Event} evt
   */
  handlePaste(evt) {
    console.log('evt:', evt.clipboardData, evt.clipboardData.items)
    if (
      evt.clipboardData &&
      evt.clipboardData.items &&
      evt.clipboardData.items.length
    ) {
      this.readFiles(evt.clipboardData.items, dataUrl => {
        const selection = this.quill.getSelection()
        console.log('selection:', selection)

        if (selection) {
          if (selection.length == 0) {
            console.log('User cursor is at index', selection.index)
          } else {
            var text = quill.getText(selection.index, selection.length)
            console.log('User has highlighted: ', text)
          }
        } else {
          console.log('User cursor is not in editor')
        }

        if (selection) {
          // we must be in a browser that supports pasting (like Firefox)
          // so it has already been placed into the editor
          setTimeout(() => this.insert(dataUrl), 0)
        } else {
          // otherwise we wait until after the paste when this.quill.getSelection()
          // will return a valid index
          setTimeout(() => this.insert(dataUrl), 0)
        }
      })
    }
  }

  /**
   * Insert the image into the document at the current cursor position
   * @param {String} dataUrl  The base64-encoded image URI
   */
  insert(dataUrl) {
    setTimeout(() => {
      const index =
        (this.quill.getSelection() || {}).index || this.quill.getLength()
      this.quill.insertEmbed(index, 'image', dataUrl, 'user')
      this.quill.setSelection(index + 1, 1)
    }, 500)
  }

  /**
   * Extract image URIs a list of files from evt.dataTransfer or evt.clipboardData
   * @param {File[]} files  One or more File objects
   * @param {Function} callback  A function to send each data URI to
   */
  readFiles(files, callback) {
    // check each file for an image
    ;[].forEach.call(files, file => {
      if (
        !file.type.match(
          /^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i
        )
      ) {
        // file is not an image
        // Note that some file formats such as psd start with image/* but are not readable
        return
      }
      // set up file reader
      const reader = new FileReader()
      reader.onload = evt => {
        callback(evt.target.result)
      }
      // read the clipboard item or file
      const blob = file.getAsFile ? file.getAsFile() : file
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob)
      }
    })
  }
}
