import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newTodo: '',
            editing: false,
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
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
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

    deleteTodo(index) {
        const todos = this.state.todos;

        delete todos[index];

        this.setState({
            todos
        });
    }

    editTodo(index) {

        const todo = this.state.todos[index];

        this.setState({
            editing: true,
            newTodo: todo.name
        });
    }

    updateTodo() {

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
                        onClick={this.state.editing ? this.updateTodo : this.addTodo}
                        className="btn-info form-control mb-3">
                        {this.state.editing ? 'Update todo' : 'Add todo'}
                    </button>
                    {!this.state.editing &&
                    <ul className="list-group">
                        {
                            this.state.todos.map((todo, index) =>


                                <li
                                    className='list-group-item'
                                    key={todo.id}
                                >

                                    <button
                                        onClick={() => this.editTodo(index)}
                                        className="btn-sm mr-3 btn-info"
                                    >
                                        U
                                    </button>

                                    {todo.name}
                                    <button
                                        onClick={() => this.deleteTodo(index)}
                                        className="btn-sm ml-3 btn-danger"
                                    >
                                        X
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                    }

                </div>
            </div>
        );
    }
}

export default App;
