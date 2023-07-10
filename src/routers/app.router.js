import { Router } from 'express'
import {getbill, sendSMS } from '../controllers/app.controller.js'

const router = Router()

router.post('/product/getbill', getbill)

router.post('/product/sms', sendSMS)

export default router