import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { channelId, members } = req.body;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios.post(`http://localhost:8080/channels/${channelId}/members`, { members }, config);

      if (response.status === 200) {
        const channelMember = response.data.channel;
        return res.status(200).json({ success: true, channelMember });
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
