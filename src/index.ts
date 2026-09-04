import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import 'dotenv/config'
import { beansRouter } from './routes/beans.route'
import { i18nRouter } from './routes/i18n.route'

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'public')))

app.use('/api/beans', beansRouter)
app.use('api/18n', i18nRouter)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))