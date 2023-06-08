import * as React from "react"

export class CounterClass extends React.Component {
  state = {
    loading: false,
    text: "",
    count: 0
  }

  inc = () => {
    let previous = this.state.count
    let next = previous +1
    this.setState({count: next})
  }

  render() {
    return (
      <div>
        <div>class count is {this.state.count}</div>
        <button onClick={this.inc}>inc</button>
      </div>
    )
  }
}
