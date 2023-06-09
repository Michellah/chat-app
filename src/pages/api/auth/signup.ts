import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { error } from "console";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, confirmPassword } = req.body;
    const data = { name, email, password, confirmPassword }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    axios
      .post('http://localhost:8080/users',data )
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          
          return res.status(201).json({ success: true });
        } else {
          return res.status(response.status).json({ error: response.statusText });
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
