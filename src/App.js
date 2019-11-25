import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import EmployeesList from "./components/employees-list.component";
import AddEmployee from "./components/add-employee.component";
import EditEmployee from "./components/edit-employee.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={EmployeesList} />
        <Route path="/add" exact component={AddEmployee} />
        <Route path="/edit/:id" exact component={EditEmployee} />
      </div>
    </Router>
  );
}

export default App;
