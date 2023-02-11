const mongoose=require("mongoose");
const preMD=require('./models/pre_marker_data_model');
const fs=require('fs');

let preMarketDataObj=JSON.parse(fs.readFileSync(`${__dirname}/preDataWrite.json`,'utf-8'));

console.log(typeof preMarketDataObj[0].final)
// Database connection

let db=mongoose.connect('mongodb://localhost:27017/natours');

const deleteData=async function(){

    try {

        await preMD.deleteMany();
        
    } catch (error) {
        console.log(error);
    }
     
    process.exit();
}

const importData=async function(){

try{

await preMD.create(preMarketDataObj);


}catch(error){
    console.log(error);
}

process.exit();
}

if(process.argv[2]==="--import"){

importData();
console.log("data fully loaded");

}else if(process.argv[2]==="--delete"){



    deleteData();

}else{


    process.exit();
}