import React from 'react';

const ListItem = (props) => {
    return (
        <li
            className='list-group-item'
        >

            <button
                onClick={props.editTodo}
                className="btn-sm mr-3 btn-info"
            >
                U
            </button>
            {props.todo.name}
            <button
                onClick={props.deleteTodo}
                className="btn-sm ml-3 btn-danger"
            >
                X
            </button>
        </li>
    );
};

export default ListItem;