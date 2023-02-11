

const express=require('express');

const router=express.Router();

const preMarketController=require('../controllers/preMarketController');



router.post('/preMarket_raw_str',preMarketController.preMarketDataPro);

router.get('/changeSomeThingInData',preMarketController.changeSomeThing);

router.get("/getStock",preMarketController.getStock);

router.post("/knowStock",preMarketController.knowStock);

module.exports=router;