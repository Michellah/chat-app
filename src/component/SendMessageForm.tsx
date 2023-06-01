import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function MessageForm() {
  const { register, handleSubmit } = useForm();
  const [ error, setError ] = useState('')

  const onSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Unauthorized');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await axios.post('/api/message', data, config);
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('content')} placeholder="Message content" />
      <button type="submit">Send Message</button>
    </form>
  );
}
