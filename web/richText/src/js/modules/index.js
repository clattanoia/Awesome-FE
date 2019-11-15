import Quill from 'quill'

import ImageDrop from './imageDrop/ImageDrop'
import ImageResize from './imageResize/ImageResize'
import PlainClipboard from './plainClipboard'
import Divider from './divider'
import UndoRedo from './undoRedo'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/clipboard', PlainClipboard, true)
Quill.register('modules/divider', Divider)
Quill.register('modules/undoRedo', UndoRedo)
