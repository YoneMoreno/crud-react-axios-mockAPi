import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="container">
                    <h2 className="text-center p-4">TASKS list!</h2>
                    <ul className="list-group">
                        <li className="list-group-item">1</li>
                        <li className="list-group-item">2</li>
                        <li className="list-group-item">3</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
