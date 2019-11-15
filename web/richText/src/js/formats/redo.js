import Quill from 'quill'

const Block = Quill.import('blots/block')

class Redo extends Block {}

Redo.blotName = 'redo'

export default Redo