import React, { useState, useEffect, use } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList';
import './App.css';
import HabitCalendar from './components/HabitCalendar';
import 'react-calendar/dist/Calendar.css';
import HabitModal from './components/HabitModal';

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [completedByDate, setCompletedByDate] = useState(() => {
    const savedCompleted = localStorage.getItem('completedByDate')
    return savedCompleted ? JSON.parse(savedCompleted) : {};
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);
  useEffect(() => {
    localStorage.setItem('completedByDate', JSON.stringify(completedByDate));
  }, [completedByDate]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [type, setType] = useState("habit");

  const imagePositions = [50, 250, 450, 650, 850];
  const bow = "https://static.vecteezy.com/system/resources/previews/036/134/147/large_2x/pink-coquette-ribbon-bow-doodle-hand-drawn-png.png";
  const teddyBear = "https://static.vecteezy.com/system/resources/previews/039/089/170/original/coquette-teddy-bear-with-pink-bow-png.png";

  const handleDateSelect = (date) => {
  console.log("Selected date:", date);
  const dateStr = date.toDateString();
  console.log("Habit IDs for that date:", completedByDate[dateStr]);
  setSelectedDate(date);
  const ids = Array.isArray(completedByDate[dateStr]) ? completedByDate[dateStr] : [];
setSelectedHabits(ids);

  setShowModal(true);
};


  const addHabit = (habit, habitColor, type, goal) => {
    setHabits((prev) => [
      ...prev, 
      {id: Date.now(), name: habit, color: habitColor, type, streak: 0, xp: 0, goal: type === "habit" ? goal : 1}
  ]);};
  const markDone = (id) => {
    setHabits((prev) => 
      prev.map((habit) => 
        habit.id === id && habit.type === "habit" ? {...habit, streak: habit.streak + 1, xp: (habit.xp || 0) + 10} : habit
      )
    );
  }
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    setCompletedByDate((prev) => {
      const newCompleted = {};
      for(const date in prev) {
        newCompleted[date] = prev[date].filter(habitId => habitId !== id);
      }
      return newCompleted;
    });
  };

  return(
    <div className="bg">
      {imagePositions.map((pos, index) => (
        <img
          key={index}
          src={index % 2 === 0 ? bow : teddyBear}
          className="side-image left-image"
          style={{ top: `${pos}px`}}
          alt=""
          />
      ))}
      {imagePositions.map((pos, index) => (
        <img
          key={index}
          src={index % 2 === 0 ? bow : teddyBear}
          className="side-image right-image"
          style={{ top: `${pos}px`}}
          alt=""
          />
      ))}
      <div className="main-container">
      <TaskForm onAddTask={addHabit} />
      <TaskList habits={habits} onMarkDone={markDone} onDelete={deleteHabit} completedByDate={completedByDate} />
      <HabitCalendar completedByDate={completedByDate} habits={habits} onDateSelect={handleDateSelect} />
      <HabitModal 
        show={showModal}
        habits={habits}
        selectedDate={selectedDate}
        selectedHabits={selectedHabits}
        setSelectedHabits={setSelectedHabits}
        onClose={() => setShowModal(false)}
        onSave={(date, ids) => {
          const dateStr = date.toDateString();
          setCompletedByDate((prev) => ({
            ...prev,
            [dateStr]: ids,
          }));
        }}
      />
      </div>
    </div>
  );
}

export default App;

