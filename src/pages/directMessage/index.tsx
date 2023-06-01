import { ChannelType } from '@/type/channelType';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { channelSchema } from '@/utils/channelValidation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { userType } from '@/type/user';
import Select from 'react-select';

export default function DirectMessage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<any>({
    resolver: yupResolver(channelSchema),
  });
  const [selectedMembers, setSelectedMembers] = useState<{ value: string; label: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<userType | null>(null);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);

  const router = useRouter();
  const [user, setUser] = useState<userType[]>([]);

  const fetchProfile = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('/api/users/allUser', config);

      if (response.status === 200) {
        const userData = response.data.users;
        setUser(userData);
      } else {
        console.log('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Internal server error');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFormSubmit = async (data: any) => {
    if (selectedUser) {
      const selectedUserId = selectedUser.id;
      const messageContent = data.message;
  
      try {
        const token = Cookies.get('token');
        if (!token) {
          setError('Unauthorized');
          return;
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const messageData = {
          recipient: selectedUserId,
          content: messageContent,
        };
  
        const response = await axios.post('/api/messages', messageData, config);
  
        if (response.status === 200) {
          console.log('Message sent!');
          setMessages(response.data.message);
        } else {
          console.log('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
        console.log('Internal server error');
      }
    } else {
      console.log('No user selected');
    }
  };
  

  return (
    <div className="direct-message">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="message-list">
          {messages.map((message: any) => (
            <div key={message.id} className="message">
              <p>{message.content}</p>
              <p>Sent by: {message.sender.name}</p>
            </div>
          ))}
        </div>
        <div className="user-select">
          <Select
            isMulti
            options={user.map((user) => ({ value: user.id, label: user.name }))}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions as { value: string; label: string; }[];
              setSelectedMembers(selectedValues);
              setValue('members', selectedValues.map((option) => option.value));

              const selectedUser = user.find((user) => user.id === selectedValues[0].value);
              setSelectedUser(selectedUser || null);
            }}
          />
        </div>
        <textarea className="message-input" {...register('message')} />

        <button className="send-button" type="submit">Send message</button>
      </form>
    </div>
  );
}
