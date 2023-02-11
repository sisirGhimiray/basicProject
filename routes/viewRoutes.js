const express=require('express');
const viewsController=require('../controllers/viewsController');

const router=express.Router();

router.get('/login',viewsController.getLoginForm);

router.get('/signup',viewsController.getSignUpForm);

router.get('/home',viewsController.getHome);

router.get('/home/askStock',viewsController.knowStock);

module.exports=router;