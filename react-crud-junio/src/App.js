import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from "./ListItem";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newTodo: '',
            editing: false,
            editingIndex: null,
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
        this.generateTodoId = this.generateTodoId.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                newTodo: event.target.value
            });
    }

    generateTodoId() {
        const lastTodo = this.state.todos[this.state.todos.length - 1];
        if (lastTodo) {
            return lastTodo.id + 1;
        }
        return 1;

    }

    addTodo() {
        const newTodo = {
            name: this.state.newTodo,
            id: this.generateTodoId()
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
            editingIndex: index,
            newTodo: todo.name,
        });
    }

    updateTodo() {
        const todo = this.state.todos[this.state.editingIndex];

        todo.name = this.state.newTodo;

        const todos = this.state.todos;
        todos[this.state.editingIndex] = todo;

        this.setState({
            todos,
            editing: false,
            editingIndex: null,
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
                        onClick={this.state.editing ? this.updateTodo : this.addTodo}
                        className="btn-info form-control mb-3">
                        {this.state.editing ? 'Update todo' : 'Add todo'}
                    </button>
                    {!this.state.editing &&
                    <ul className="list-group">
                        {
                            this.state.todos.map((todo, index) =>
                                <ListItem
                                    key={todo.id}
                                    deleteTodo={() => this.deleteTodo(index)}
                                    editTodo={() => this.editTodo(index)}
                                    todo={todo}
                                />
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
