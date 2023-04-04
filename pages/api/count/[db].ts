import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { db } = req.query
	try {
		const response = await prisma[db.toString()].count(req.body)
		res.status(200).json(response)
	} catch (error) {
		res.status(400).json(error)
		res.status(400).json({ code: "ERROR" })
	}
}
