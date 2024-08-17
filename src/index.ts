import express, { Response } from 'express'
import 'dotenv/config'
import { PORT } from './config/EnvConfigs'
import { userRoute } from './routes/user'
import { adminRoute } from './routes/admin'
const app = express()

app.get('/',(req,res:Response)=>{

    res.status(200).json({
        success:true,
        message:'Server is Running '
    })
})

app.use('/apis/user',userRoute)
app.use('/apis/admin',adminRoute)


app.listen(PORT,()=>console.log(`Running at ${PORT}`)
)