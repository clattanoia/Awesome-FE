import Quill from 'quill'
import handlers from './handlers'

import './formats'
import './modules'

const quill = new Quill('#editor', {
  theme: 'snow',
  bounds: '#editor',
  scrollingContainer: 'body',
  placeholder: '支持常规编辑器功能，图片粘贴、拖动上传、缩放、模拟图库功能',
  scrollingContainer: '#container',

  modules: {
    toolbar: {
      container: '#toolbar-container',  // Selector for toolbar container
      handlers
    },
    imageDrop: true,
    imageResize: {},
    divider: true,
    undoRedo: true
  },

})

quill.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change') {
    // args[0] 将是Delta
  } else if (eventName === 'selection-change') {
    // args[0] 将是就得范围
  }
})
