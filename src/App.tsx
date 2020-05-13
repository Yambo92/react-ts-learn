import React from 'react'
import logo from './logo.svg'
import './App.css'
import Confirm from './Confirm'

interface IState {
  confirmOpen: boolean
  confirmMessage: string
  confirmVisible: boolean
  countDown: number
}
/* 
 tell the  App component about the state type, which we can do using the 
second generic parameter of  React.Component;
We have used  {} as the props type because there are no props for this
component
*/
class App extends React.Component<{}, IState> {
  private timer: number = 0
  private renderCount = 0
  constructor(props: {}) {
    super(props)
    this.state = {
      confirmOpen: false,
      confirmMessage: 'Please hit the confirm button',
      confirmVisible: true,
      countDown: 10,
    }
  }
  /*  because the state is updated asynchronously, and so
this.state.countDown won't have necessarily updated the line after we
update it in the  setState call */
  private handleTimerTick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${this.state.countDown} secs to go`,
        countDown: this.state.countDown - 1,
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer)
          this.setState({
            confirmMessage: 'Too late to confirm',
            confirmVisible: false,
          })
        }
      }
    )
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000)
  }

  public componentWillUnmount() {
    clearInterval(this.timer)
  }

  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log('getDerivedStateFromProps()', props, state)
    return null
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    console.log('shouldComponentUpdate()', nextProps, nextState)
    return true
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1
    console.log('getSnapshotBeforeUpdate', prevProps, prevState, {
      renderCount: this.renderCount,
    })
    return this.renderCount
  }

  public componentDidUpdate(prevProps: {}, prevState: IState, snapshot: number) {
    console.log('componentDidUpdate()', prevProps, prevState, snapshot, {
      renderCount: this.renderCount,
    })
  }

  private handleCancelConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Take a break, i'm sure you will later...",
    })
    clearInterval(this.timer)
  }
  private handleOkConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: 'Cool, carry on reading!',
    })
    clearInterval(this.timer)
  }
  private handleConfirmClick = () => {
    this.setState({ confirmOpen: true })
    clearInterval(this.timer)
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React and TypeScript
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && <button onClick={this.handleConfirmClick}>Confirm</button>}
        {this.state.countDown > 0 && (
          <Confirm
            open={this.state.confirmOpen}
            title="React and TypeScript"
            content="Are you sure you want to learn TS"
            cancelCaption="不可能"
            okCaption="好好好"
            onOkClick={this.handleOkConfirmClick}
            onCancelClick={this.handleCancelConfirmClick}
          />
        )}
      </div>
    )
  }
}

export default App
