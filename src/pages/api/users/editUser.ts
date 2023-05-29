import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
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
      const { name, email, oldPassword, password, confirmPassword, bio } = req.body;
      const data = { name, email, oldPassword, password, confirmPassword, bio };
      const response = await axios.put('http://localhost:8080/user',data, config);
      if (response.status === 200) {
        const user = response.data.user;
        return res.status(200).json({ success: true, user });
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
