
const mongoose=require('mongoose');


const PreMarketDataSchema=new mongoose.Schema({

    symbol: {
        type:String,
        required:[true,"Please Enter the company Name"]
    },
    previousClose:{
        type:Number
    },
    indicativeEquilibriumPrice:{
        type:Number
    },
    change: {
        type:Number
    },
    percentageChange: {
        type:Number
    },
    final: {
        type:Number
    },
    finalQuantity: {
        type:Number
    },
    value: {
        type:Number
    },
    normalMarket52WeekHigh: {
        type:String
    },
    normalMarket52WeekLow: {
        type:String
    },

    date:{
        type:Date,
        default:new Date(),
        select:true,
    }



})



const preMD=mongoose.model('PreMarketData',PreMarketDataSchema);


module.exports=preMD;