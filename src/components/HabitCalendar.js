import React, { useState } from 'react';
import styles from './HabitCalendar.module.css';
import Calendar from 'react-calendar';

function HabitCalendar({completedByDate, onDateSelect, habits}) {
    const [value, setValue] = useState(new Date());

    const handleChange = (date) => {
        setValue(date);
        onDateSelect(date);
    };
    return (
        <div className={styles.calendarWrapper}>
            <h2 className={styles.calendarHeader}>Calendar</h2>
            <Calendar 
            onClickDay={handleChange}
            value={value}
            tileContent = {({date, view}) => {
                const dateStr = date.toDateString();
                if(completedByDate[dateStr]) {
                    return (
                        <div style={{display: "flex", justifyContent: 'center', gap: "2px"}}>
                            {completedByDate[dateStr].map(id => {
                                const habit = habits.find(h=> h.id === id);
                                return (
                                    <span key={id} style={{width:'8px', height: '8px', borderRadius: '50%', backgroundColor: habit && habit.color ? habit.color : "#000"
}}></span>
                                );
                            })}
                        </div>    
                    );
                }
                return null;
            }}
            />
        </div>
    );
}  

export default HabitCalendar;