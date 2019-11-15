import Quill from 'quill'

function clean(quill) {
  const { index, length } = quill.getSelection(true)
  const formats = quill.getFormat(index, length)
  if (length) {
    const delta = quill.getContents(index, length)
    cleanFormats(quill, delta)
  } else {
    Object.keys(formats).forEach(format => {
      quill.format(format, false, Quill.sources.USER)
    })
  }
}

function cleanFormats(quill, delta) {
  const Delta = Quill.import('delta')
  let opsLength = 0
  const { index, length } = quill.getSelection()

  quill.updateContents(new Delta().retain(index).delete(length))

  delta.ops.forEach(({ insert }) => {
    if (!insert) {
      return
    }
    if (typeof insert === 'string') {
      quill.updateContents(new Delta().retain(index + opsLength).insert(insert))
      opsLength += insert.length
    }
    if (typeof insert === 'object' && insert.image) {
      quill.updateContents(new Delta().retain(index + opsLength).insert(insert))
      opsLength++
    }
  })

  quill.setSelection(index + opsLength, 0, Quill.sources.SILENT)

  // 无需列表，有序列表需要清除光标样式
  Object.keys(quill.getFormat(index + opsLength)).forEach(format => {
    quill.format(format, false, Quill.sources.USER)
  })
}

function copyFormat(quill, copyFormatting) {
  if (copyFormatting.className === 'un-active') {
    const range = quill.getSelection(true)
    if (range === null || range.length === 0) {
      return
    }
    const format = quill.getFormat(range)
    setCopyFormatting(quill, copyFormatting, 'active', format)
  } else {
    setCopyFormatting(quill, copyFormatting, 'un-active', null)
  }
}

function setCopyFormatting(quill, copyFormatting, className, format) {
  copyFormatting.className = className
  copyFormatting.format = format
  const toolbar = quill.getModule('toolbar').container
  const brushBtn = toolbar.querySelector('.ql-formatBrush')
  if (className === 'active') {
    brushBtn.classList.add('ql-active')
    quill.on('selection-change', pasteFormatHandler)
  } else {
    brushBtn.classList.remove('ql-active')
    quill.off('selection-change', pasteFormatHandler)
  }

  function pasteFormatHandler(range) {
    return pasteFormat(range, quill, copyFormatting)
  }
}

function pasteFormat(range, quill, copyFormatting) {
  if (range && copyFormatting.format && range.length !== 0) {
    if (Object.keys(copyFormatting.format).length === 0) {
      quill.removeFormat(range.index, range.length)
    } else {
      const length = Object.keys(copyFormatting.format).includes('list')
        ? range.length + 1
        : range.length
      quill.formatText(range.index, length, copyFormatting.format)
    }
    setCopyFormatting(quill, copyFormatting, 'un-active', null)
  }
}

export default {
  clean() {
    clean(this.quill)
  },
  image(value) {
    if (value) {
      const href = prompt('Enter the URL')
      this.quill.format('link', href)
    } else {
      this.quill.format('link', false)
    }
  },
  formatBrush() {
    copyFormat(this.quill, { className: 'un-active' })
  }
}
