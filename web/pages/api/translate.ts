import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'


//curl -X POST 'https://api-free.deepl.com/v2/translate' \
	//-H 'Authorization: DeepL-Auth-Key YOUR_API_KEY' \
	//-d 'text=Hello%2C%20world!' \
	//-d 'target_lang=DE'

    // {
    //     "translations": [
    //       {
    //         "detected_source_language": "EN",
    //         "text": "Hallo, Welt!"
    //       }
    //     ]
    //   }

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { text } = req.body;
    const body = {
        text: [text],
        target_lang: 'EN'
    }
    const headers = {
        "Authorization": `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`
    }
    const response = await axios.post('https://api-free.deepl.com/v2/translate', body, { headers })
    const translation = response.data["translations"][0]["text"]

    res.status(200).json({ 
        response_text: translation
    })
}