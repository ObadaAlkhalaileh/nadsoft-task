const db=require('../../db/db')

//localhost:3000/currencies?cca2=ng
const getCurrencies=(req,res)=>{
    if(!req.query.cca2)req.query.cca2=''

    const query=`SELECT currencies FROM countries WHERE cca2 LIKE '%${req.query.cca2}%';`

    db.query(query,(err,result)=>{
      if (err) throw err;
      
      const parsed=result.map((elem)=>JSON.parse(elem.currencies))
      
      res.json(parsed)
    })
}

  module.exports={
    getCurrencies,
  }