const express = require("express");
const getCountriesRouter = express.Router();

const { getAllCountries } = require("../controllers/getAllCountries");

getCountriesRouter.get("/", getAllCountries);

module.exports = getCountriesRouter;
