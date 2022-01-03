const express = require("express");
const getCurrenciesRouter = express.Router();

const { getCurrencies } = require("../controllers/getCurrencies");

getCurrenciesRouter.get("/", getCurrencies);

module.exports = getCurrenciesRouter;
