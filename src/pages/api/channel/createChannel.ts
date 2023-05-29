import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      const { name,type, members } = req.body;
      const data = { name, type, members};
      const response = await axios.post('http://localhost:8080/channel',data, config);
      if (response.status === 200) {
        const channel = response.data;
        console.log(channel);
        
        return res.status(200).json({ success: true, channel });
      } else {
        return res.status(response.status).json({ error: 'An error occurred' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(404).json({ error: 'Route not found' });
  }
}
