import React from 'react'
import logo from './logo.svg'
import './App.css'
import Confirm from './Confirm'

interface IState {
  confirmOpen: boolean
  confirmMessage: string
}
/* 
 tell the  App component about the state type, which we can do using the 
second generic parameter of  React.Component;
We have used  {} as the props type because there are no props for this
component
*/
class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      confirmOpen: true,
      confirmMessage: 'Please hit the confirm button',
    }
  }
  private handleCancelConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Take a break, i'm sure you will later...",
    })
  }
  private handleOkConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: 'Cool, carry on reading!',
    })
  }
  private handleConfirmClick = () => {
    this.setState({ confirmOpen: true })
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
        <button onClick={this.handleConfirmClick}>Confirm</button>
        <Confirm
          open={this.state.confirmOpen}
          title="React and TypeScript"
          content="Are you sure you want to learn TS"
          cancelCaption="不可能"
          okCaption="好好好"
          onOkClick={this.handleOkConfirmClick}
          onCancelClick={this.handleCancelConfirmClick}
        />
      </div>
    )
  }
}

export default App
