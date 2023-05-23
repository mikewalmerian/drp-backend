import express, { json } from 'express'
import cors from 'cors'
import { router } from './routes.js'

const app = express()
app.use(cors())
app.use(json())

const PORT = process.env.PORT || 4000

app.use('/', router)

app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT} 🚀`))
