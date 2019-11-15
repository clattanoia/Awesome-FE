import Quill from 'quill'

const Parchment = Quill.import('parchment')

const config = {
  scope: Parchment.Scope.INLINE,
  whitelist: ['serif', 'monospace']
}

class FontStyleAttributor extends Parchment.Attributor.Style {
  value(node) {
    return super.value(node).replace(/["']/g, '')
  }
}

let FontStyle = new FontStyleAttributor('font', 'font-family', config)

export default FontStyle
