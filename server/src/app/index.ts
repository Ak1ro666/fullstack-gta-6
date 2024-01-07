import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import 'colors'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3333

app.post('/api', async (req, res) => {
	const { email, name } = req.body

	if (!email || !name) {
		res.status(400).json({ message: 'Email and name required field!' })
	}

	try {
		const createdRow = await prisma.waitList.create({
			data: {
				email,
				name
			}
		})

		res.json(createdRow)
	} catch (error) {
		res.status(400).send({ message: error })
	}
})

const server = app.listen(port, () => {
	console.log(`Server start on ${port} port`.green.bold)
})
