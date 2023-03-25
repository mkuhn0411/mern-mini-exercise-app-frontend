import { useReducer, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

const initialState = { username: '', description: '', duration: 0, date: new Date()};

const reducer = (state, action) => {
    switch (action.type) {
        case 'username':
            return {...state, username: action.payload};
        case 'description':
            return {...state, description: action.payload};
        case 'duration':
            return {...state, duration: action.payload};
        case 'date':
            return {...state, date: action.payload};
        default:
            return state;
    }
}

const CreateExercise = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                response.data.length > 0 && setUsers(response.data.map(user => user.username))
            })
    }, []);

    const handleFormChange = event => {
        const { name, value } = event.target;
        dispatch({ type: name, payload: value});
    }

    const submitHandler = event => {
        event.preventDefault();

        const exercise = {
            username: state.username,
            description: state.description,
            duration: state.duration,
            date: state.date
        }

        axios.post('http://localhost:5000/exercises/add', state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/';
    }

    return (
        <div className="container">
            <h3>Create new exercise log</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Username:</label>
                    <select 
                        name="username"
                        required
                        className="form-control"
                        value={state.username}
                        onChange={handleFormChange} 
                    >
                        {users.map(user => (
                             <option key={user} value={user}>{user}</option>
                        ))}

                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        required
                        name="description"
                        className="form-control"
                        value={state.description}
                        onChange={handleFormChange}
                     />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes)</label>
                    <input
                        type="text"
                        required
                        name="duration"
                        className="form-control"
                        value={state.duration}
                        onChange={handleFormChange}
                     />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <DatePicker 
                        selected={state.date} 
                        onChange={date => dispatch({ type: "date", payload: date})}
                        value={state.date}
                        name="date"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
 }

 export default CreateExercise;