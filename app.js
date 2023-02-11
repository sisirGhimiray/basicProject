const path=require('path');
const express=require('express');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const viewRouter=require('./routes/viewRoutes');
const userRouter=require('./routes/userRoutes');
const preMarketRouter=require('./routes/preMarketRoute');
const AppError=require("./utils/appError");
const globalErrorHandler=require("./controllers/errorController");
const app=express();

app.use(express.json({limit:'50mb'}));


if(process.env.NODE_ENV==='development'){
 
  app.use(morgan('dev'));
}



app.use(cookieParser());





// app.options('http://localhost:8800',cors());
// app.use(cors());


// Cors - Cross-Origin-Site-Request

app.use((req,res,next)=>{

if(req.method==="OPTIONS"){
  res.setHeader('Access-Control-Allow-Methods','POST,PATCH,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, x-requested-with,Set-Cookie');
  res.setHeader('Access-Control-Allow-Credentials',true);
  
  res.status(204);
   return next();

}
next();
})

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Methods','POST,PATCH,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Credentials',true);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8800')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, x-requested-with,Set-Cookie');

next();
})


// 


// app.options("*",function(req, res, next) {
//   res.status(204);
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE")
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
//   next();
// });






app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('./frontend/public'));

// Development logging

// app.use((req,res,next=>{

//   if (process.env.NODE_ENV === 'development') {
//     console.log(req.method,` ${req.url} ${Date.now()}`);
//   }

//   next();
// }))


app.use('/',viewRouter);

app.use('/api/v1/users',userRouter);

app.use('/premarket',preMarketRouter);



app.all("*",function(req,res,next){

  next(new AppError(`Can't find ${req.originalUrl} on this server`),404)

})

app.use(globalErrorHandler);

module.exports=app;