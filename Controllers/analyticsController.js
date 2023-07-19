const mongoose= require('mongoose')
const asyncHandler= require('express-async-handler')

const piechat= asyncHandler(async(req,res)=>{
    const startdate=req.params.startdate
    const enddate=req.params.enddate

    const piechat=[
        {
            "id": "Completed",
            "label": "Completed",
            "value": 0,
            "color": "hsl(236, 70%, 50%)"
        },
        {
            "id": "Incomplet",
            "label": "Incomplet",
            "value": 0,
            "color": "hsl(241, 70%, 50%)"
        },
        {
            "id": "Started",
            "label": "Started",
            "value": 0,
            "color": "hsl(316, 70%, 50%)"
        }

    ]
    

    const date1=new Date(new Date(startdate).toDateString());
    var nextDay=date1
    nextDay.setDate(nextDay.getDate() );
    nextDay=nextDay.toISOString().split('T')[0]

    const date2=new Date(new Date(enddate).toDateString());
    var stopDay=date2
    stopDay.setDate(stopDay.getDate() + 1);
    stopDay=stopDay.toISOString().split('T')[0]

    while(nextDay!=stopDay && nextDay<=stopDay)
    {
        const db = mongoose.connection.getClient();
        const collection = db.db().collection(nextDay);
        let data=[];
        const r = await collection.find({}).toArray().then((doc) => {
            data=doc;
            return data;  
        })

        r.map((objects)=>{
            
            if(objects.status=="completed"){
                piechat[0].value=piechat[0].value+1
            }
            if(objects.status=="incomplete")
            {
                piechat[1].value=piechat[1].value+1
            }
            if(objects.status=="started")
            {
                piechat[2].value=piechat[2].value+1
            }
        })

        var nextDay = new Date(nextDay);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay=nextDay.toISOString().split('T')[0]
    }
        
    res.json(piechat)
})

const bargraph= asyncHandler(async(req,res)=>{
    const startdate=req.params.startdate
    const enddate=req.params.enddate

    const series=[
        {
          name: 'Completed',
          type: 'column',
          data: [],
        },
        {
          name: 'Incomplete',
          type: 'column',
          data: [],
        },
        {
          name: 'Started',
          type: 'line',
          data: [],
        },
      ]

    const dates=[]

    const date1=new Date(new Date(startdate).toDateString());
    var nextDay=date1
    nextDay.setDate(nextDay.getDate() );
    nextDay=nextDay.toISOString().split('T')[0]

    const date2=new Date(new Date(enddate).toDateString());
    var stopDay=date2
    stopDay.setDate(stopDay.getDate() + 1);
    stopDay=stopDay.toISOString().split('T')[0]

    

    while(nextDay!=stopDay && nextDay<=stopDay)
    {
        dates.push(nextDay.toString())

        var x=0,y=0,z=0;

        const db = mongoose.connection.getClient();
        const collection = db.db().collection(nextDay);
        let data=[];
        const r = await collection.find({}).toArray().then((doc) => {
            data=doc;
            return data;  
        })

        r.map((objects)=>{
            
            if(objects.status=="completed"){
                x=x+1
            }
            if(objects.status=="incomplete")
            {
                y=y+1
            }
            if(objects.status=="started")
            {
                z=z+1
            }
        })

        series[0].data.push(x)
        series[1].data.push(y)
        series[2].data.push(z)

        var nextDay = new Date(nextDay);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay=nextDay.toISOString().split('T')[0]
    }

    
        res.json({series,dates})

})

module.exports={
    piechat,
    bargraph
}