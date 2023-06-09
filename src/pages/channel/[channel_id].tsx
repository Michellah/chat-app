import React, { useEffect, useState } from 'react'
import SendMessageForm from '@/component/SendMessageForm'
import { useRouter } from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';
export default function index({ channel_id, messages }: any) {
  const [channelList, setChannelList] = useState(messages);
  const router = useRouter();

  const fetchChannel = async () => {
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

      let url = `http://localhost:8080/messages/channel/${channel_id}`;
      const response = await axios.get(url, config);
      const updatedMessages = response.data.messages || [];

      setChannelList(updatedMessages);
    } catch (error) {
      console.error('An error occurred while fetching messages', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchChannel, 1000); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <ul>
        {channelList
          .filter((message: any) => message.createdAt)
          .sort((a:any, b:any) => (b.createdAt).localeCompare(a.createdAt))
          .reverse()
          .map((message:any) => (
            <li key={message.sender.id}>
              <p>Name: {message.sender.name}</p>
              <p>Date: {message.createdAt}</p>
              <p>{message.content}</p>
            </li>
          ))}
      </ul>
      <SendMessageForm />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { channel_id } = context.query;
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`http://localhost:8080/messages/channel/${channel_id}`, config);
    const messages = response.data.messages || [];

    return {
      props: {
        channel_id,
        messages,
      },
    };
  } catch (error) {
    console.error('An error occurred while retrieving channels', error);
    return {
      props: {
        channel_id,
        messages: [],
      },
    };
  }
}
