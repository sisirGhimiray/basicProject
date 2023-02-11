
const mongoose=require('mongoose');
const dotenv=require('dotenv');

process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION !!! Shutting down...');
    console.log(err.name,err.message);
    process.exit(1);
})

dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE;

const app=require('./app')


mongoose.connect(DB).then(()=>{
    console.log('DB connection successful!')
}).catch((err)=>{
    console.log(err);
})

const port=process.env.PORT;

const server=app.listen(port,()=>{
    console.log(`app running on port ${port}...`);
})

process.on('unhandledRejection',err=>{
    console.log('UNHANDLED REJECTION !!! Shutting down...');
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    })
    
})