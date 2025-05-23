import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.headers['x-netlify-event'] || req.headers['x-netlify-event'] !== 'deploy_succeeded') {
    return {
        status: 400,
        body: "Invalid event type.",
    }
  }

  try {
    res.status(200).json({ message: 'Successfully Triggered Action from DEPLOY_SUCCEEDED' })
  } catch (e) {
    res.status(500).json({ message: `ERROR: ${e}`})
  }
}