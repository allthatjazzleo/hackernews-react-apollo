import React, { Component } from 'react'

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.link.description} url: {this.props.link.url}
        </div>
      </div>
    )
  }
}

export default Link