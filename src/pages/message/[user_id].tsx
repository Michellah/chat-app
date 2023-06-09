import React, { useEffect, useState } from 'react'
import SendMessageForm from '@/component/SendMessageForm'
import { useRouter } from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../../styles/Message.module.css'
export default function index({ user_id, messages }: any) {
  const [messageList, setMessageList] = useState(messages);
  const router = useRouter();

  const fetchMessages = async () => {
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

      let url = `http://localhost:8080/messages/${user_id}`;
      const response = await axios.get(url, config);
      const updatedMessages = response.data.messages || [];
      console.log(messageList);
      
      setMessageList(updatedMessages);
    } catch (error) {
      console.error('An error occurred while fetching messages', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 1000); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container} >
    
      <div className={styles.message}>
      <ul>
        {messageList
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
      </div>
        
      <SendMessageForm />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { user_id } = context.query;
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

    const response = await axios.get(`http://localhost:8080/messages/${user_id}`, config);
    const messages = response.data.messages || [];

    return {
      props: {
        user_id,
        messages,
      },
    };
  } catch (error) {
    console.error('An error occurred while retrieving messages', error);
    return {
      props: {
        user_id,
        messages: [],
      },
    };
  }
}
