import "reflect-metadata"
import express, { Request, Response, NextFunction, response } from "express"
import "express-async-errors"

import "./database"
import { router } from './routes'
import env from './config/env'

const app = express()
app.use(express.json())
app.use(router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(env.port, () => console.log("Server is running"))
