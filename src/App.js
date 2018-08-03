import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="js-push">订阅消息(提醒))</button>
        <section className="subscription-details js-subscription-details is-invisible">
          <pre><code className="js-subscription-json"></code></pre>
        </section>
      </div>
    );
  }

  componentDidMount() {
    import('./pushWorker')
  }
}

export default App;
