import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.headers['x-netlify-event'] || req.headers['x-netlify-event'] !== 'deploy_restored') {
    return {
        status: 400,
        body: "Invalid event type.",
    }
  }

  try {
    const body = req.body
    const nameParts = body.name.split('-');
    const payload = JSON.stringify({
        ref: body.branch,
        inputs: {
            'state': body.state,
            'deploy_url': body.deploy_url,
            'context': body.context,
            'environment': nameParts[1],
            'country': nameParts[2],
        },
    });

    console.log('PAYLOAD: ', payload )
  } catch (e) {
    res.status(500).json({ message: `ERROR: ${e}`})
  }

  res.status(200).json({ message: 'Hello from Next.js!' })
}