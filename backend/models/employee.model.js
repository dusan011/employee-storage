const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  companyName: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  salary: { type: Number, required: true }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
