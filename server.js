const express = require("express");
const axios = require("axios");
require("dotenv").config();
const db = require("./db/db");

const app = express();

//converting the API link from binary to utf
const BIN = require("bin-converter");
const bin = new BIN();
const apiUrl=bin.parseBinaryFromString(`01101100 01101100 01100001 00101111 00110001 00101110 00110011 01110110 00101111 01101101 01101111 01100011 00101110 01110011 01100101 01101001 01110010 01110100 01101110 01110101 01101111 01100011 01110100 01110011 01100101 01110010 00101111 00101111 00111010 01110011 01110000 01110100 01110100 01101000`).split('').reverse().join('')

//the function that will get all data from external API and store the desired fields
const storeCountriesInfo=()=>{
  axios
    .get(apiUrl)
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
