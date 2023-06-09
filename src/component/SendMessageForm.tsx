import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageSchema } from '@/utils/messageValidation';
import { useRouter } from 'next/router';

export default function SendMessageForm() {
  const router = useRouter();
  const { user_id, channel_id } = router.query;
  

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(messageSchema)
  });

  const onSubmit = async (data:any) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login')
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      if (user_id) {
        const response = await axios.post('http://localhost:8080/message/', {
          recipientId: user_id,
          content: data.message,
        }, config);
        console.log(response.data);
      } else if (channel_id) {
        const response = await axios.post('http://localhost:8080/message/', {
          channelId: channel_id,
          content: data.message,
        }, config);

        console.log(response.data);
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('message')} placeholder="Enter your message" name='message' />
        <button type="submit" className='sendMessageButton'>Send</button>
      </form>
    </div>
  );
}
