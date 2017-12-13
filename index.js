const React = require('react')
const ReactDOM = require('react-dom')
import Enquete from './components/Enquete.js'

const render = () => {
  ReactDOM.render(
    <Enquete />,
    document.getElementById('root')
  )
}

window.onload = render
