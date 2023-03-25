 import { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import axios from 'axios';

 const Exercise = ({ exercise, deleteExercise, key }) => (
    <tr>
        <td>{exercise.username}</td>
        <td>{exercise.description}</td>
        <td>{exercise.duration}</td>
        <td>{exercise.date.substring(0, 10)}</td>
        <td>{key}</td>
        <td>
            <Link to={`/edit/${exercise._id}`}>Edit</Link> | <a href="#" onClick={() => deleteExercise(exercise._id)}>Delete Exercise</a>
        </td>
    </tr>
 )
  
 const ExercisesList = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises')
            .then(response => {
                response.data.length > 0 && setExercises(response.data);
            })
            .catch(err => console.log(err))
    }, []);

    const deleteExercise = id => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(response => console.log(response.data))
            .catch(err => console.log(err));

        setExercises(exercises.filter(exercise => exercise._id !== id));
    }

    const exerciseData = (
        exercises.map(exercise => (
            <Exercise exercise={exercise} deleteExercise={deleteExercise} key={exercise._id}/>
        ))
    )

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thread className="thread-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thread>
                <tbody>
                    {exerciseData}
                </tbody>
            </table>
        </div>
    )
 }

 export default ExercisesList;