import Quill from 'quill'

import ImageDrop from './imageDrop/ImageDrop'
import ImageResize from './imageResize/ImageResize'
import PlainClipboard from './plainClipboard'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/clipboard', PlainClipboard, true)
