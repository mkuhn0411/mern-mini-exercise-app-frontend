import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [username, setUsername] = useState('');

    const submitHandler = event => {
        event.preventDefault();
        console.log("username " + username);
        axios.post('http://localhost:5000/users/add', { username })
            .then(res => console.log(res.data))

        setUsername('');
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text"
                        required
                        value={username}
                        className="form-control"
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
 }

 export default CreateUser;