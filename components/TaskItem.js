import React from 'react';
import styles from './TaskItem.module.css';

function TaskItem({ habit, onMarkDone, onDelete, completedByDate }) {
  const streakCount =
    habit.type === "habit"
      ? Object.values(completedByDate).filter((dayIds) => dayIds.includes(habit.id)).length
      : 0;

  const percent = habit.goal ? (streakCount / habit.goal) * 100 : 0;

  return (
    <div className={styles.habitContainer}>
      <span className={styles.colorCode} style={{ backgroundColor: habit.color }}></span>
      <span>
        { habit.name /*(Streak: {streakCount}) */}
      </span>

      {habit.type === "habit" && (
        <>
          <div className={styles.progress}>
            <div
              style={{
                width: `${percent > 100 ? 100 : percent}%`,
                backgroundColor: "#f07167",
                height: "100%",
                borderRadius: "5px",
              }}
            ></div>
          </div>

          {streakCount >= habit.goal && (
            <span style={{ color: "green", marginLeft: "5px", marginRight: "5px" }}>🎉 Goal Met!</span>
          )}
        </>
      )}

      {/* <button className={styles.button} onClick={() => onMarkDone(habit.id)}>
        {habit.type === "task" ? "Done" : "Mark Done"}
      </button> */}
      <button className={styles.button} onClick={() => onDelete(habit.id)}>
        Done
      </button>
    </div>
  );
}

export default TaskItem;
