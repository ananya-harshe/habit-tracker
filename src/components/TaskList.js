import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ habits, onMarkDone, onDelete, completedByDate }) {
  return (
    <div>
        <h2 style={{textAlign: 'center'}}>To-do List</h2>
        <ul>
        {habits.map((habit) => (
            <TaskItem 
            key={habit.id} 
            habit={habit} 
            onMarkDone={onMarkDone} 
            onDelete={onDelete} 
            completedByDate={completedByDate}
            />
        ))}
        </ul>
    </div>
  );
}

export default TaskList;