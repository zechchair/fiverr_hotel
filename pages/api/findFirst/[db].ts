import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { db } = req.query
	try {
		const response = await prisma[db.toString()].findFirst(req.body)
		res.status(200).json(response)
		console.log(response)
	} catch (error) {
		console.log(error)
		res.status(400).json({ code: "ERROR" })
	}
}
