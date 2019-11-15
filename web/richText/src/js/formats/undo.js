import Quill from 'quill'

const Block = Quill.import('blots/block')

class Undo extends Block {}

Undo.blotName = 'undo'

export default Undo