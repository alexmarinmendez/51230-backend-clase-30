import { Router } from 'express'
import getbill from '../controllers/app.controller.js'

const router = Router()

router.post('/product/getbill', getbill)

export default router