import Quill from 'quill'

import Blockquote, { BlockquoteItem } from './blockquote'
import Divider from './divider'
import Undo from './undo'
import Redo from './redo'
import FontStyle from './font'

const Icons = Quill.import('ui/icons')
const AlignStyle = Quill.import('attributors/style/align')
const Size = Quill.import('attributors/style/size')

Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']

Quill.register({ 'formats/blockquote': Blockquote }, true)
Quill.register({ 'formats/BlockquoteItem': BlockquoteItem })
Quill.register({ 'formats/divider': Divider })
Quill.register({ 'formats/redo': Redo, 'formats/undo': Undo })
Quill.register({ 'formats/font': FontStyle }, true)
Quill.register(AlignStyle, true)
Quill.register(Size, true)

// 设置工具栏按钮图标
Icons.divider = '<span class="iconfont icon-editor-dividing">'
Icons.blockquote = '<span class="iconfont icon-quotation-left">'
Icons.undo = '<span class="iconfont icon-editor-cancel">'
Icons.redo = '<span class="iconfont icon-editor-redo">'
Icons.bold = '<span class="iconfont icon-editor-bold">'
Icons.italic = '<span class="iconfont icon-xieti">'
Icons.underline = '<span class="iconfont icon-editor-underline">'
Icons.strike = '<span class="iconfont icon-shanchuxian">'
Icons.list.ordered = '<span class="iconfont icon-fuwenbenbianjiqiyouxuliebiaobeifen">'
Icons.list.bullet = '<span class="iconfont icon-fuwenbenbianjiqiwuxuliebiao">'
Icons.align[''] = '<span class="iconfont icon-editor-align-left">'
Icons.align.center = '<span class="iconfont icon-editor-align-center">'
Icons.align.right = '<span class="iconfont icon-editor-align-right">'
Icons.link = '<span class="iconfont icon-editor-link">'
Icons.image = '<span class="iconfont icon-image">'
Icons.video = '<span class="iconfont icon-video">'
Icons.formatBrush = '<span class="iconfont icon-editor-brush">'
Icons.clean = '<span class="iconfont icon-editor-eraser">'
Icons.color = '<span class="iconfont icon-jurassic_font-color">'
Icons.background = '<span class="iconfont icon-font-bgcolor">'
Icons.indent['-1'] = '<span class="iconfont icon-indent-decrease">'
Icons.indent['+1'] = '<span class="iconfont icon-indent-increase">'