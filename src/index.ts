import express, { Response } from 'express'
import 'dotenv/config'
import { PORT } from './config/EnvConfigs'
import { userRoute } from './routes/user.routes'
import { adminRoute } from './routes/admin.routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { doctorRoute } from './routes/doctors.routes'
import { createDoctor } from './controllers/doctors.controller'
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.get('/',(req,res:Response)=>{
    res.status(200).json({
        success:true,
        message:'Server is Running '
    })
})

app.use('/apis/user',userRoute)
app.use('/apis/admin',adminRoute)
app.use('/apis/doctors',doctorRoute)


app.listen(PORT,()=>console.log(`Running at ${PORT}`)
)