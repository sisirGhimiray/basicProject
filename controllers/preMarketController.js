
const preMMO=require('../makePreMarketDataToObject');
const pd=require('../models/pre_marker_data_model');
const catchAsync=require('../utils/catchAsync')
 
exports.preMarketDataPro=catchAsync(async function(req,res){



        //    console.log(req.body);
        
           let premData= preMMO.make_obj_of_premarketData(req.body.raw_str);
           
           let cre_prem_data=await pd.create(premData);
        
        res.status(201).json({
            status:'success',
            data:{
                cre_prem_data,
            }
        })

  
})


exports.changeSomeThing=async function(req,res){

try{

    let document=await pd.updateMany({date:{$lt:new Date("2023-01-27"),$gte:new Date("2023-01-26")}},{$set:{date:new Date("2023-01-25")}})

res.status(200).json({
    status:"success",
    data:document,
})
}catch(err){



    console.log(err);
}

}



exports.getStock=async function(req,res){
    console.log(req.query);

try{
    let queryStr=JSON.stringify(req.query);
    queryStr=queryStr.replace(/\b(lt|lte|gt|gte)\b/g,match=>`$${match}`);
    let queryObj=JSON.parse(queryStr);
    console.log(queryObj);
// let data=await pd.find(queryObj);
// console.log(data.length);

    res.status(200).json({
        status:"success",
        data:data,
    
    })
}catch(error){

    console.log(err);
}




}


exports.knowStock=catchAsync(async function(req,res){



    let queryObj={
        date:{$lt:new Date("2023-02-3"),$gte:new Date("2023-02-2")},
        final:{$gt:req.body.gtPrice,$lt:req.body.ltPrice},

    }
    
    console.log(typeof queryObj);
    
//    let data=pd.find(JSON.parse(queryObj));
   
    res.status(200).json({
        status:"success",
        data:data
    })
    
} 


)