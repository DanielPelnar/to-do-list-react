import './App.css';
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // an array of tasks (text)
  const [text, setText] = useState("");                          

  return (
    <div className="App">
      <Header />
      <Tasks tasks={tasks} setTasks={setTasks} />
      <TaskForm setTasks={setTasks} text={text} setText={setText}/>
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Your Tasks</h1>;
}

function Tasks({ tasks, setTasks }) {
  return (
    <>
      <ul>
        {tasks.map((task, index) => {
          return <Task key={index} text={task} setTasks={setTasks} tasks={tasks} />;
        })}
      </ul>
      {tasks.length === 0 && <strong><p>You have no tasks.</p></strong>}
    </>
  );
}

function Task({ text, setTasks, tasks }) {
  function onClickHandler(e) {
    // console.log(e.target.innerHTML)
    const newTasks = tasks.filter((item) => {
      return item !== e.target.innerHTML;
    })
    setTasks(newTasks);
  }

  return (
    <li onClick={onClickHandler}>{text}</li>
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

function Footer() {
  return <p>A task can be deleted by clicking on it.</p>;
}


export default App;
