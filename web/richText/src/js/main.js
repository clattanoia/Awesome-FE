import Quill from 'quill'
import { ImageDrop } from './plugins/imageDrop/ImageDrop'
import { ImageResize } from './plugins/imageResize/ImageResize'

// 图片相关
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

// 自定义字体大小
let Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
Quill.register(Size, true)

// 自定义字体类型
var fonts = [
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'Times-New-Roman',
  'sans-serif'
]
var Font = Quill.import('formats/font')

Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)

const toolbarOptions = {
  handlers: {
    // 事件对象将于默认的事件处理对象合并
    image: function(value) {
      if (value) {
        var href = prompt('Enter the URL')
        this.quill.format('link', href)
      } else {
        this.quill.format('link', false)
      }
    }
  }
}

const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: '支持常规编辑器功能，图片粘贴、拖动上传、缩放、模拟图库功能',
  scrollingContainer: '#container',

  modules: {
    toolbar: '#toolbar-container',
    imageDrop: true,
    imageResize: {}
  }
})

quill.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change') {
    // args[0] 将是Delta
  } else if (eventName === 'selection-change') {
    // args[0] 将是就得范围
  }
})
