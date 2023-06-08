import React, { Component } from "react"
//import { hot } from "react-hot-loader/root"
import { CounterClass } from "./CounterClass"
import { CounterHookArrow } from "./CounterHookArrow"
import { CounterHookFunction } from "./CounterHookFunction"

//import css from 'cxs'
import css from 'css-jss'

const classes = {
  container: css({
    background: "green"
  })
}



class App extends Component {
  state = {
    loading: false,
    text: ""
  }

  fetchApi = (delay = 2000) => {
    this.setState({
      loading: true
    })

    
    fetch("/api")
      .then((response) => response.text())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            loading: false,
            text: data
          })
        }, delay)
      })
  }

  componentDidMount() {
    this.fetchApi()
  }

  render() {
    //const classes = sheet
    //const { classes } = this.props
    const { loading, text } = this.state

    return (
      <div className={classes.container}>
        <button onClick={() => this.fetchApi(2000)}>fetch with 2000ms delay</button>
        <button onClick={() => this.fetchApi(0)}>fetch immediately</button>
        Hello world !
        {loading ? (
          <div> Fetching data ...</div>
        ) : (
          <div>Text from API : {text}</div>
        )}
        <CounterClass />
        <CounterHookArrow />
        <CounterHookFunction />
      </div>
    )
  }
}

export default App

//export default hot(App)

//export default hot(module)(App)
//export default hot(module)(withStyles(styles)(App))
