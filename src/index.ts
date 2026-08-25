import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import 'dotenv/config'
import { beansRouter } from './routes/beans.route'

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'public')))

app.use('/api/beans', beansRouter)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))