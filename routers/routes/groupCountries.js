const express = require("express")
const groupRouter = express.Router()

const {groupByLanguage}=require("../controllers/groupCountries")
const {groupByRegion}=require("../controllers/groupCountries")

groupRouter.get("/language",groupByLanguage)
groupRouter.get("/region",groupByRegion)

module.exports = groupRouter