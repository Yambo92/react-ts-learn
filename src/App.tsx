import React from 'react'
import logo from './logo.svg'
import './App.css'
import Confirm from './Confirm'
function App() {
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
      <Confirm
        title="React and TypeScript"
        content="Are you sure you want to learn TS"
        cancelCaption="不可能"
        okCaption="好好好"
      />
    </div>
  )
}

export default App
