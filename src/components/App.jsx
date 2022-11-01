import TodoList from "./TodoList";
import AppHeader from "./AppHeader";
import SearchPanel from "./SearchPanel";
import ItemStatusFilter from "./ItemStatusFilter";
import ItemAddForm from "./ItemAddForm";
import React, { Component } from "react";

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
  ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  onToggleImportant = (id) => {
     this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProrerty(todoData, id, 'important')
      };
    });
  };

  toggleProrerty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      
        return [
          ...arr.slice(0, idx),
          newItem,
        ...arr.slice(idx + 1)
        ];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProrerty(todoData, id, 'done')
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

   return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
      <SearchPanel />
      <ItemStatusFilter />
       </div>
       
      <TodoList
         todos={todoData}
         onDeleted={this.deleteItem}
         onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone} />
       
       <ItemAddForm
      onItemAdded={this.addItem} />
    </div>
  );
}
};
