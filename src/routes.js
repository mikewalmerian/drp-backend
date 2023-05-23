import { Router } from 'express'
import { getRingpoolData } from './controllers/getRingpoolData.js'
import { sendCalledResponse } from './controllers/sendCalledResponse.js'

export const router = Router()

router.route('/').post(getRingpoolData).get(sendCalledResponse)
