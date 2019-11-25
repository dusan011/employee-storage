import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = props => (
  <tr>
    <td>{props.employee.companyName}</td>
    <td>{props.employee.name}</td>
    <td>{props.employee.surname}</td>
    <td>{props.employee.email}</td>
    <td>{props.employee.address}</td>
    <td>{props.employee.salary}</td>
    <td>
      <Link to={"/edit/" + props.employee._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteEmployee(props.employee._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);

    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = { employees: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/employees/")
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //DELETE SINGLE EMPLOYEE
  deleteEmployee(id) {
    axios.delete("http://localhost:5000/employees/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      employees: this.state.employees.filter(el => el._id !== id)
    });
  }

  //SHOW ALL EMPLOYEES
  employeesList() {
    return this.state.employees.map(currentemployee => {
      return (
        <Employee
          employee={currentemployee}
          deleteEmployee={this.deleteEmployee}
          key={currentemployee._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>All Employees</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Company Name</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.employeesList()}</tbody>
        </table>
      </div>
    );
  }
}
