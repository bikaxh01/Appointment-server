import express, { Response } from 'express'
import 'dotenv/config'
import { PORT } from './config/EnvConfigs'
import { userRoute } from './routes/user.routes'
import { adminRoute } from './routes/admin.routes'
import bodyParser from 'body-parser'
const app = express()
app.use(express.urlencoded({extended:true}))
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