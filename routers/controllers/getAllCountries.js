const db=require('../../db/db')

//localhost:3000/?name=ni&cca2=n&cca3=a
const getAllCountries=(req,res)=>{
    if(!req.query.name)req.query.name=''
    if(!req.query.cca2)req.query.cca2=''
    if(!req.query.cca3)req.query.cca3=''
    if(!req.query.ccn3)req.query.ccn3=''

    const query=`SELECT * FROM countries 
    WHERE name LIKE '%${req.query.name}%' 
    AND cca2 LIKE '%${req.query.cca2}%' 
    AND cca3 LIKE '%${req.query.cca3}%' 
    AND ccn3 LIKE '%${req.query.ccn3}%' ;`
  
    db.query(query,(err,result)=>{
      if (err) throw err;
      res.json(result)
    })
}

  module.exports={
      getAllCountries,
  }