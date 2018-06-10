import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newTodo: '',
            todos: [
                {
                    id: 1,
                    name: 'Play golf'
                },
                {
                    id: 2,
                    name: 'Cook'
                },
                {
                    id: 3,
                    name: 'Laugh'
                }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                newTodo: event.target.value
            });
    }

    addTodo() {
        const newTodo = {
            name: this.state.newTodo,
            id: this.state.todos[this.state.todos.length - 1].id + 1
        };

        const todos = this.state.todos;
        todos.push(newTodo);

        this.setState({
            todos,
            newTodo: ''
        });
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="container">

                    <input
                        className='form-control my-3'
                        type="text" name="addTodo" id="addTodo"
                        placeholder='Add your new todo'
                        onChange={this.handleChange}
                        value={this.state.newTodo}
                    />


                    <button
                        onClick={this.addTodo}
                        className="btn-info form-control mb-3">
                        Add todo
                    </button>

                    <ul className="list-group">
                        {
                            this.state.todos.map((todo) =>
                                <li
                                    className='list-group-item'
                                    key={todo.id}
                                >
                                    {todo.name}
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
