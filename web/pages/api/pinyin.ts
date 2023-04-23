import { NextApiRequest, NextApiResponse } from 'next'
import hanziTools from "hanzi-tools"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { text } = req.body;
    res.status(200).json({ 
        response_text: hanziTools.pinyinify(text)
    })
}