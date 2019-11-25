import React, { Component } from "react";
import axios from "axios";

export default class EditExercise extends Component {
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
      companyName: "",
      name: "",
      surname: "",
      email: "",
      address: "",
      salary: 0,
      companies: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/employees/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          companyName: response.data.companyName,
          name: response.data.name,
          surname: response.data.surname,
          email: response.data.email,
          address: response.data.address,
          salary: response.data.salary
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/companies/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            companies: response.data.map(company => company.companyName)
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
      .post(
        "http://localhost:5000/employees/update/" + this.props.match.params.id,
        employee
      )
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Employee Information</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Company Name: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.companyName}
              onChange={this.onChangeCompanyName}
            >
              {this.state.companies.map(function(company) {
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
              className="form-control"
              value={this.state.surname}
              onChange={this.onChangeSurname}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>Salary: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.salary}
              onChange={this.onChangeSalary}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Employee Information"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
