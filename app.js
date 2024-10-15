import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import connectDb from './dB/connectDb.js'
import userRouter from './route/user.route.js'
import authRouter from './route/admit.route.js'


const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("App is runnig");
})

app.use('/user',userRouter);
app.use('/admin',authRouter);

app.listen(port , ()=>{
    try {
        connectDb();
        console.log(`listening at http://localhost:${port}`);
    } catch (error) {
        console.log("listening error ",error.message);
        
    }
    
})