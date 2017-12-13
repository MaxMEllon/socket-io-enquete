import _ from 'lodash'
import React from 'react'

const root = {
  width: '900px',
  height: '900px'
}

const block = {
  display: 'inline-block',
  width: '290px',
  height: '290px',
  backgroundColor: 'rgba(0, 255, 255, 0.24)',
  border: '1px solid gray',
  borderRadius: '30px',
}

const score = {
  display: 'block',
  marginTop: '130px',
  fontSize: '30px',
  textAlign: 'center'
}

const connect = () => {
  return io('ws://localhost:3000');
}

export default class Enquete extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this)
    this.state = {
      value: new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    }
    console.log(this.state.value)
  }

  componentDidMount() {
    this.socket = connect()
    this.socket.on('update', (scores) => {
      this.setState({ value: scores })
    })
  }

  onClick(id) {
    this.socket.emit('count', { id: id })
  }

  render() {
    const sum = _.sum(this.state.value)
    return (
      <div style={root}>
        {
          _.times(9, (id) => (
            <div key={id} style={block} onClick={() => this.onClick(id)}>
              <span style={score}>
                {(() => {
                  if (sum === 0) return 0
                  return `${Math.floor(this.state.value[id] / sum * 100)}%`
                })()}
              </span>
            </div>
          ))
        }
      </div>
    )
  }
}
