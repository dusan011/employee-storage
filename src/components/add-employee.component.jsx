import React, { Component } from "react";
import axios from "axios";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      surname: "",
      email: "",
      address: "",
      salary: 0,
      companyNames: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/companies/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            companyNames: response.data.map(company => company.companyName),
            companyName: response.data[0].companyName
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeSurname(e) {
    this.setState({
      surname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const employee = {
      companyName: this.state.companyName,
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      address: this.state.address,
      salary: this.state.salary
    };

    console.log(employee);

    axios
      .post("http://localhost:5000/employees/add", employee)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Add New Employee</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Company: </label>
            <select
              ref="companyInput"
              required
              className="form-control"
              value={this.state.companyName}
              onChange={this.onChangeCompanyName}
            >
              {this.state.companyNames.map(function(company) {
                return (
                  <option key={company} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Surname: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.surname}
              onChange={this.onChangeSurname}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>Salary: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.salary}
              onChange={this.onChangeSalary}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add New Employee"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
