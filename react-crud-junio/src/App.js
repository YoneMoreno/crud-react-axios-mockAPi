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
            notification: null,
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
        this.alert = this.alert.bind(this);
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

        this.alert('TODO Added OK!');
    }

    alert(notification) {
        this.setState({
            notification
        });

        setTimeout(() => {
            this.setState({
                notification: null
            })
        }, 2000)
    }

    deleteTodo(index) {
        const todos = this.state.todos;

        delete todos[index];

        this.setState({
            todos
        });

        this.alert('Todo deleted OK!');
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

        this.alert('The TODO is updated!');
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="container">

                    {
                        this.state.notification &&
                        <div className="alert alert-success mt-3">
                            <p className="text-center">{this.state.notification}</p>
                        </div>
                    }


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
