import { Router } from 'express'
import { sendCalledResponse } from './controllers/sendCalledResponse.js'
import { getRingpoolData } from './controllers/getRingpoolData.js'

export const router = Router()

router.get('/', getRingpoolData)
router.get('/called', sendCalledResponse)
