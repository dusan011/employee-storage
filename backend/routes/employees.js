const router = require("express").Router();
let Employee = require("../models/employee.model");

//GET ALL EMPLOYEES
router.route("/").get((req, res) => {
  Employee.find()
    .select("_id name surname email address salary companyName")
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json("Error: " + err));
});

//ADD new employee
router.route("/add").post((req, res) => {
  const companyName = req.body.companyName;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const address = req.body.address;
  const salary = Number(req.body.salary);

  const newEmployee = new Employee({
    companyName,
    name,
    surname,
    email,
    address,
    salary
  });

  newEmployee
    .save()
    .then(() => res.json("Employee added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//GET SINGLE EMPLOYEE
router.route("/:id").get((req, res) => {
  Employee.findById(req.params.id)
    .select("_id name surname email address salary companyName")
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json("Error: " + err));
});

//DELETE SINGLE EMPLOYEE
router.route("/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

//UPDATE SINGLE EMPLOYEE
router.route("/update/:id").post((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.companyName = req.body.companyName;
      employee.name = req.body.name;
      employee.surname = req.body.surname;
      employee.email = req.body.email;
      employee.address = req.body.address;
      employee.salary = Number(req.body.salary);

      employee
        .save()
        .then(() => res.json("Employee updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
