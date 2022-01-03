# nadsoft-task

**STEPS TO GET STARTED:

in terminal,navigate to any wanted directory then run: 

-> git clone (repo link)

-> cd nadsoft_task

-> npm install

navigate to db directory and run -> mysql -u (mysql localhost username: usually root) < "table.sql" -p
and then insert your password

un-comment the 2nd line in table.sql file in order to keep refreshing the the database with each execution of table.sql file

in terminal, navigate to root directory and run-> npm start OR npm run dev

((here the server will work and automatically get all data from the external API and store desired fields in our database))
and then the server starts listening for different requests done using browser or postman

**API's FUNCTIONALITY AND URLS:

* Get all countries and search for any of its names->localhost:3000/?name=ni&cca2=n&cca3=a&ccn3=5
you can enter any search criteria you want like ..localhost:3000/?name=ni OR localhost:3000/?cca2=n

* Get country currencies using CCA2 name-> localhost:3000/currencies?cca2=ng

* Group countries by language -> localhost:3000/groupBy/language
or by region -> localhost:3000/groupBy/region

**NOTES:
-mysql have to be installed to use mysql databast functionality in this application
-there is also another method using online mysql database but here we used local one
-.env file is published with the code for evaluation, where it isnt supposed to be exposed


Thanks for your time :)
