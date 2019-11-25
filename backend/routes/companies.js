const router = require("express").Router();
let Company = require("../models/company.model");

router.route("/").get((req, res) => {
  Company.find()
    .select("_id companyName")
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const companyName = req.body.companyName;

  const newCompany = new Company({ companyName });

  newCompany
    .save()
    .then(() => res.json("Company added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
