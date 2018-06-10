import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from "./ListItem";
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newTodo: '',
            editing: false,
            editingIndex: null,
            notification: null,
            todos: []
        };

        this.apiUrl = 'https://5b1d6826a1c56c001458c63a.mockapi.io';

        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.alert = this.alert.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get(`${this.apiUrl}/todos`);

        this.setState({
            todos: response.data
        });

    }


    handleChange(event) {
        this.setState(
            {
                newTodo: event.target.value
            });
    }

    async addTodo() {

        const response = await axios.post(`${this.apiUrl}/todos`, {
            name: this.state.newTodo,
        });


        const todos = this.state.todos;
        todos.push(response.data);

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

    async deleteTodo(index) {
        const todos = this.state.todos;

        const todo = todos[index];

        await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

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
                        disabled={this.state.newTodo.length < 5}
                        onClick={this.state.editing ? this.updateTodo : this.addTodo}
                        className="btn-success form-control mb-3">
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
