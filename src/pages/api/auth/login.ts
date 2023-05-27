import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from 'js-cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      axios
        .post('http://localhost:8080/users/login', { email, password })
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.user.token;
            Cookies.set('token', token)
           return res.status(200).json({ success: true });
          } else {
           return res.status(401).json({ error: 'Invalid credentials' });
          }
        })
        .catch((error) => {
            console.error('Error:', error);
         return res.status(500).json({ error: 'Internal server error' });
          
        });
    } else {
      return res.status(404).json({ error: 'Route not found' });
    }
  }
  