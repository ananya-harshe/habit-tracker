import React, { useState } from "react";
import styles from "./TaskForm.module.css";

function TaskForm({onAddTask}) {
  const [task, setTask] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [type, setType] = useState("habit"); // Default type is "habit"
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const [goal, setGoal] = useState(1); // Default goal streak is 1

  const handleSubmit = (e) => {
    e.preventDefault();
    if(task.trim() === "") return;
    onAddTask(task, color, type, goal);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formStyle}>
      <h1>Teddy Tracker</h1>
      <h2 style={{lineHeight: "1.5"}}>A calendar planner to help you plan tasks <br></br>and achieve habits!!</h2>
        <h3>Add a New Task or Habit Here: </h3>
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter a new habit"
          className={styles.inputStyle}
          />
          <label className={styles.text}>
            Pick a color: 
            <input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{marginLeft: "10px", backgroundColor: "#fdfdcd"}}
            />
          </label>
          <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)} className={styles.dropdown}>
          <option value="task">Task</option>
          <option value="habit">Habit</option>
        </select>
        {type === "habit" && (
        <label>
          Goal Streak: 
          <input
            type="number"
            min="1"
            placeholder="Enter goal streak"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className={styles.inputStyle}></input>
        </label>
        )}
      </label>
        <button type="submit" className={styles.button}>Add</button>
    </form>
  );
};

export default TaskForm;
