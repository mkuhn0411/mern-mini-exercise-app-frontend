import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';



function App() {
  return (
    <Router>
        <Navbar />
        <br />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<ExercisesList />} />
            <Route path="/edit/:id" element={<EditExercise />} />
            <Route path="/create" element={<CreateExercise />} />
            <Route path="/test" element={<h1>Test</h1>} />
            <Route path="/user" element={<CreateUser />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
