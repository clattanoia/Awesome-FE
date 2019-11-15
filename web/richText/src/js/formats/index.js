import Quill from 'quill'

import Blockquote, { BlockquoteItem } from './blockquote'
import Divider from './divider'
import Undo from './undo'
import Redo from './redo'

Quill.register({ 'formats/blockquote': Blockquote }, true)
Quill.register({ 'formats/BlockquoteItem': BlockquoteItem })
Quill.register({ 'formats/divider': Divider })
Quill.register({ 'formats/redo': Redo, 'formats/undo': Undo })


const Icons = Quill.import('ui/icons')

// 设置工具栏按钮图标
Icons.divider = '<span class="iconfont icon-editor-dividing">'
Icons.blockquote = '<span class="iconfont icon-quotation-left">'
Icons.undo = '<span class="iconfont icon-editor-cancel">'
Icons.redo = '<span class="iconfont icon-editor-redo">'
Icons.bold = '<span class="iconfont icon-editor-bold">'
Icons.italic = '<span class="iconfont icon-xieti">'
Icons.underline = '<span class="iconfont icon-editor-underline">'
Icons.list.ordered = '<span class="iconfont icon-fuwenbenbianjiqiyouxuliebiaobeifen">'
Icons.list.bullet = '<span class="iconfont icon-fuwenbenbianjiqiwuxuliebiao">'
Icons.align[''] = '<span class="iconfont icon-editor-align-left">'
Icons.align.center = '<span class="iconfont icon-editor-align-center">'
Icons.align.right = '<span class="iconfont icon-editor-align-right">'
Icons.link = '<span class="iconfont icon-editor-link">'
Icons.image = '<span class="iconfont icon-image">'
Icons.formatBrush = '<span class="iconfont icon-editor-brush">'
Icons.clean = '<span class="iconfont icon-editor-eraser">'