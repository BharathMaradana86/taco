const mongoose=require('mongoose')
const asyncHandler= require('express-async-handler')

const userAlerts=asyncHandler(async(req,res)=>{

    const date=req.params.id;

    const db = mongoose.connection.getClient();
    const collection = db.db().collection(date);
    let data=[];
    const r = await collection.find({}).toArray().then((doc) => {
        data=doc;
        return data;  
    })

    if(r.length){
        r.map((item)=>{
            if(item.step_1_start_time){
                 const date=new Date(item.step_1_start_time*1000)
                item.step_1_start_time=date
            }
           
            if(item.step_2_start_time){
                const date2=new Date(item.step_2_start_time*1000)
                item.step_2_start_time=date2
            }
            

            if(item.step_3_start_time){
                const date3=new Date(item.step_3_start_time*1000)
                item.step_3_start_time=date3
            }
            
            if(item.step_4_start_time){
                const date4=new Date(item.step_4_start_time*1000)
            item.step_4_start_time=date4
            }
            
            if(item.step_5_start_time){
                const date5=new Date(item.step_5_start_time*1000)
            item.step_5_start_time=date5
            }

            if(item.step_6_start_time){
                const date6=new Date(item.step_6_start_time*1000)
            item.step_6_start_time=date6
            }
            if(item.step_7_start_time){
                const date7=new Date(item.step_7_start_time*1000)
            item.step_7_start_time=date7
            }
            if(item.step_8_start_time){
                const date8=new Date(item.step_8_start_time*1000)
            item.step_8_start_time=date8
            }

            if(item.start_timestamp){
                const datestart=new Date(item.start_timestamp*1000)
            item.start_timestamp=datestart
            }
            if(item.end_timestamp){
                const dateend=new Date(item.end_timestamp*1000)
            item.end_timestamp=dateend
            }
            
        })
        res.json(r)
    }else{
        res.json([])
    }
    

})

module.exports={
    userAlerts
}