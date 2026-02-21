/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const WorkoutContext = createContext();

// 1) Cardio(with the badge as cardio and the tutorial link as https://www.youtube.com/watch?v=_kGESn8ArrU)
// 2) Leg day https://www.youtube.com/watch?v=gcIqwTuaP4o
// 3) flexibility https://www.youtube.com/watch?v=v7AYKMP6rOE
// 4) posture corrective training https://www.youtube.com/watch?v=dWcORvu-jtU
// 5) core workout https://www.youtube.com/watch?v=NQxEUC3-aaE
// 6) barbell overhead https://www.youtube.com/watch?v=NQxEUC3-aaE

const INITIAL_WORKOUTS = [
    { id: '1', title: 'Cardio Blast', duration: '20 Min', intensity: 'High', target: 'Cardio', url: 'https://www.youtube.com/embed/_kGESn8ArrU' },
    { id: '2', title: 'Leg Day Inferno', duration: '45 Min', intensity: 'High', target: 'Legs', url: 'https://www.youtube.com/embed/gcIqwTuaP4o' },
    { id: '3', title: 'Yoga Flexibility', duration: '30 Min', intensity: 'Low', target: 'Flexibility', url: 'https://www.youtube.com/embed/v7AYKMP6rOE' },
    { id: '4', title: 'Posture Corrective', duration: '15 Min', intensity: 'Low', target: 'Health', url: 'https://www.youtube.com/embed/dWcORvu-jtU' },
    { id: '5', title: 'Core Crusher', duration: '20 Min', intensity: 'Medium', target: 'Abs', url: 'https://www.youtube.com/embed/NQxEUC3-aaE' },
    { id: '6', title: 'Barbell Overload', duration: '40 Min', intensity: 'High', target: 'Strength', url: 'https://www.youtube.com/embed/KP1sYz2VICk' },
];

export function WorkoutProvider({ children }) {
    const [workouts, setWorkouts] = useState(INITIAL_WORKOUTS);

    const addWorkout = (newWorkout) => {
        setWorkouts(prev => [...prev, newWorkout]);
    };

    return (
        <WorkoutContext.Provider value={{ workouts, addWorkout }}>
            {children}
        </WorkoutContext.Provider>
    );
}

export const useWorkouts = () => useContext(WorkoutContext);
