import { NextApiRequest, NextApiResponse } from 'next'
import LanguageDetection from '@smodin/fast-text-language-detection';

const lid = new LanguageDetection();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { text } = req.body;
    const prediction = await lid.predict(text.trim());
    if (prediction.length == 0) {
        return "en"
    }
    const lang = prediction[0].lang;
    res.status(200).json({
        response_text: lang
    })
}