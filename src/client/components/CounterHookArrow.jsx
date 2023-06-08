import * as React from "react"

export var CounterHookArrow = (props) => {
  const [count, setCount] = React.useState(0)
  var inc = () => {
    let previous = count
    let next = previous +1
    setCount(next)
  }


  return (
    <div>
      <div>hook(arrow) count is {count}</div>
      <button onClick={inc}>inc</button>
    </div>
  )
}
