import './App.css';
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // an array of tasks (text)
  const [text, setText] = useState("");                          

  return (
    <div className="App">
      <Header />
      <Tasks tasks={tasks} />
      <TaskForm setTasks={setTasks} text={text} setText={setText}/>
    </div>
  );
}

function Header() {
  return <h1>Your Tasks</h1>;
}

function Tasks({ tasks }) {
  return (
    <>
      <ul>
        {tasks.map((task, index) => {
          return <Task key={index} text={task}/>;
        })}
      </ul>
      {tasks.length === 0 && <strong>You have no tasks.</strong>}
    </>
  );
}

function Task({ text }) {
  return (
    <li>{text}</li>
  );
}

function TaskForm({ setTasks, text, setText }) {

  function onChangeHandler(e) {
    setText(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    setTasks((prev) => [...prev, text]); // with useState, array is considered immutable in React!!!
    e.target.reset();
    setText("");
  }
  
  return (
    <form onSubmit={onSubmitHandler}>
      <input 
        type="text" 
        placeholder="Add Task"
        onChange={onChangeHandler}
      />
      <input
        type="submit" 
        disabled={!text}
      />
    </form>
  );
}


export default App;
