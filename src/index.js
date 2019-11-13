import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const Title = () => {
    return (
        <div>
            <div>
                <h1>to-do</h1>
            </div>
        </div>
    );
}

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                addTodo(input.value);
                input.value = '';
            }}>
                +
            </button>
        </div>
    );
}

const Todo = ({todo, remove}) => {
    // Each todo
    return (<li onClick={() => {remove(todo.id)}}> {todo.text} </li>);
}

const TodoList = ({todos, remove}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove} />)
    });
    return (<ul>{todoNode}</ul>)
}

// Container Component
// Todo ID
window.id = 0;
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    // Add todo handler
    addTodo(val) {
    // Assemble data
        const todo = {
            text: val,
            id: window.id++
        }
        // Update data
        this.state.data.push(todo);
        // Update state
        this.setState({
            data: this.state.data
        });
    }
    // Handle remove
    handleRemove(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id)
                return todo;
            else
                return;
        });
        // Update state with filter
        this.setState({
            data: remainder
        });
    }

    render() {
        return (
            <div>
                <Title />
                <TodoForm addTodo={this.addTodo.bind(this)} />
                <TodoList
                    todos={this.state.data}
                    remove={this.handleRemove.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById('container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
