import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user_id = req.query;
    
    if (req.method === 'GET') {
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

      const response = await axios.get(`http://localhost:8080/messages/${user_id}`, config);

      if (response.status === 201) {
        const message = response.data;
        console.log(message);
        
        return res.status(201).json({ success: true, message });
      } else {
        return res.status(response.status).json({ error: response.statusText });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(404).json({ error: 'Route not found' });
  }
}
