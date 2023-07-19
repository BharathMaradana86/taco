const mongoose=require('mongoose')
const asyncHandler= require('express-async-handler')

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

const userHome= asyncHandler(async (req,res)=>{
  const date=formatDate(new Date())
  // const date='2023-06-02'
    
  const db = mongoose.connection.getClient();
  const collection = db.db().collection(date);
  let data=[];
  const r = await collection.find({}).toArray().then((doc) => {
    data=doc;
   return data;  
  })
  let x=0
  r.map((objects)=>{
    
    if(objects.status!="completed"){
      x=x+1
    }
  })
  if(x){
    res.json(x)
  }
  else{
    res.json('No Data')
  }
}
)

module.exports= {
    userHome
}
