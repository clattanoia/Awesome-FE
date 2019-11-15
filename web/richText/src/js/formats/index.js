import Quill from 'quill'

import Blockquote, { BlockquoteItem } from './blockquote'

Quill.register({ 'formats/blockquote': Blockquote }, true)
Quill.register({ 'formats/BlockquoteItem': BlockquoteItem })
