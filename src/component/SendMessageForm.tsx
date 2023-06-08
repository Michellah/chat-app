import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageSchema } from '@/utils/messageValidation';
import { messageType } from '@/utils/messageType';
import { useRouter } from 'next/router';

export default function SendMessageForm({ recipientId }: any) {
  const router = useRouter()
  const {user_id} = router.query;
  const { register, handleSubmit } = useForm<messageType>(
    {
      resolver: yupResolver(messageSchema)
    }
  );
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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
      const response = await axios.post('http://localhost:8080/message/', {
        recipientId: user_id,
        content: data.content,
      }, config);

      console.log(response.data.message.content);
      setMessage(response.data.message.content)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('recipientId')} value={user_id} readOnly />
        <textarea {...register('content')} placeholder="Message content" />
        <button type="submit">Send Message</button>
      </form>
      <p>{message}</p>
    </div>

  );
}
