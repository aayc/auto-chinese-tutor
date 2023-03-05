import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const api_key = process.env.OPENAI_API_KEY
const base_url = process.env.OPENAI_BASE_URL
const deployment_name = process.env.OPENAI_DEPLOYMENT_NAME
const api_version = "2022-06-01-preview"
const url = base_url + "/openai/deployments/" + deployment_name + "/completions?api-version=" + api_version

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = {
        "prompt": req.body.prompt,
        "max_tokens": 512,
        "temperature": 0.5
    }
    const headers = {
            "api-key": api_key!,
            "Content-Type": "application/json"
        }
    console.log(payload)
    const response = await axios.post(url, payload, { headers })
    const response_text = response.data.choices[0].text

    res.status(200).json({ 
        response_text
    })
}