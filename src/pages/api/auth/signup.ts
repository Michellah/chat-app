import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import Cookies from 'js-cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ error: 'Passwords do not match' });
      return;
    }

    axios
    .post('http://localhost:8080/users', { name, email, password, confirmPassword })
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
