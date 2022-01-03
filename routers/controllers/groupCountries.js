const db=require('../../db/db')

// localhost:3000/groupBy/language
const groupByLanguage=(req,res)=>{

    const query=`SELECT COUNT(id), languages FROM countries GROUP BY languages;`

    db.query(query,(err,result)=>{
      if (err) throw err;
      res.json(result)
    })
}

const groupByRegion=(req,res)=>{

    const query=`SELECT COUNT(id), region FROM countries GROUP BY region;`

    db.query(query,(err,result)=>{
      if (err) throw err;
      res.json(result)
    })
}
  module.exports={
    groupByLanguage,
    groupByRegion,
  }