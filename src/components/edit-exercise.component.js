import { useReducer, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
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
            return {...state, date: new Date(action.payload)};
        default:
            return state;
    }
}

const EditExercise = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/${id}`)
            .then(response => {
                console.log(response.data)
                dispatch({ type: 'username', payload: response.data.username });
                dispatch({ type: 'description', payload: response.data.description });
                dispatch({ type: 'duration', payload: response.data.duration });
                dispatch({ type: 'date', payload: response.data.date });
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

        axios.post(`http://localhost:5000/exercises/update/${id}`, state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/';
    }

    return (
        <div className="container">
            <h3>Update exercise log</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        required
                        name="username"
                        className="form-control"
                        value={state.username}
                        onChange={handleFormChange}
                     />
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
                        onChange={date => console.log(date)}
                        value={state.date}
                        name="date"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
 }

 export default EditExercise;