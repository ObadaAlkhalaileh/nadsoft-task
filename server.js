const express = require("express");
const axios = require("axios");
require("dotenv").config();
const db = require("./db/db");

const app = express();

//the function that will get all data from external API and store the desired fields
const storeCountriesInfo=()=>{
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      const filteredResult = response.data.map((elem) => {
        return {
          name: `${elem.name.common},${elem.name.official}`,
          languages: elem.languages,
          cca2: elem.cca2,
          cca3: elem.cca3,
          ccn3: elem.ccn3,
          region: elem.region,
          currencies: elem.currencies,
          lateAndLong: elem.latlng,
        };
      });

      //insert the filtered data from the external API to sql DB as json string
      filteredResult.forEach((country) => {
        const query = `INSERT INTO countries (
        name,
        languages,
        cca2,
        cca3,
        ccn3,
        region,
        currencies,
        lateAndLong
        
      ) VALUES (?,?,?,?,?,?,?,?);`;
        const lang =country.languages?(Object.values(country.languages).join(',')):null;

        const arr = [
          country.name ,
          lang ,
          country.cca2,
          country.cca3,
          country.ccn3,
          country.region,
          JSON.stringify(country.currencies),
          JSON.stringify(country.lateAndLong)
        ];

        db.query(query, arr, (err, result) => {
          if (err) throw err;
        });
      });
      console.log('data collected!');
    })
    .catch((err) => console.log(err));
}

storeCountriesInfo()

//routers
const getCountriesRouter = require("./routers/routes/getAllCountries");
const getCurrenciesRouter = require("./routers/routes/getCurrencies")
const groupRouter = require("./routers/routes/groupCountries")

//built-in middlewares
app.use(express.json());

//app routers
app.use(getCountriesRouter);
app.use("/currencies",getCurrenciesRouter);
app.use("/groupBy",groupRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server On ${port}`);
});
