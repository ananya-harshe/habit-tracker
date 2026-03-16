import React from 'react';
import './HabitModal.css';

function HabitModal({show, habits, onClose, onSave, selectedDate, selectedHabits, setSelectedHabits})
{
    if (!show || !habits || !selectedDate) {
        console.log("Modal blocked: ", {show, habits, selectedDate});
        return null;
    }

    const handleCheckboxChange = (id) => {
        if(selectedHabits.includes(id)) {
            setSelectedHabits(selectedHabits.filter((h) => h !== id));
        }
        else {
            setSelectedHabits([...selectedHabits, id]);

        }
    };

    const handleSave = () => {
        onSave(selectedDate, selectedHabits);
        onClose();
    };
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3>
                    Mark tasks or habits for {selectedDate ? selectedDate.toDateString() : "Select a date"}
                </h3>

                <ul>
                    {habits.map((habit) => (
                        <li key={habit.id}>
                            <label>
                              <input
                              type="checkbox"
                              checked={selectedHabits.includes(habit.id)}
                              onChange={() => handleCheckboxChange(habit.id)}
                              />
                              {habit.name}
                              </label></li>  
                    ))}
                </ul>
                <div className="button-wrapper">
                    <button onClick={handleSave} className="button">Save</button>
                    <button onClick={onClose} className="button">Close</button>
                </div>
            </div>
        </div>
    );
}

export default HabitModal;
