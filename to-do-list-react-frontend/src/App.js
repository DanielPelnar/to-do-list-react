import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // an array of tasks (text)
  const [text, setText] = useState("");  
  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
    else {
      setTasks([]);
    }
  }, []); // the function inside is called on the first rendering

  return (
    <div className="App">
      <Header />
      <Tasks tasks={tasks} setTasks={setTasks} />
      <TaskForm tasks={tasks} setTasks={setTasks} text={text} setText={setText}/>
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
    // delete a task that was clicked on:
    const newTasks = tasks.filter((item) => {
      return item !== e.target.innerHTML;
    })
    setTasks(newTasks);
    localStorage.setItem("savedTasks", JSON.stringify(newTasks));
  }

  return (
    <li onClick={onClickHandler}>{text}</li>
  );
}

function TaskForm({ tasks, setTasks, text, setText }) {

  function onChangeHandler(e) {
    setText(e.target.value);
  }

  function onSubmitHandler(e) {
    // Adding a task that was submitted:
    e.preventDefault();
    const newTasks = [...tasks, text];
    setTasks(newTasks); // with useState, array is considered immutable in React!!!
    localStorage.setItem("savedTasks", JSON.stringify(newTasks));
    e.target.reset();
    setText("");
  }
  
  return (
    <form onSubmit={onSubmitHandler} >
      <input 
        type="text" 
        placeholder="Add Task"
        onChange={onChangeHandler}
        className="form"
      />
      <input
        type="submit" 
        disabled={!text}
        className="form"
      />
    </form>
  );
}

function Footer() {
  return <p id="footer">A task can be deleted by clicking on it.</p>;
}


export default App;
