import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditChannel() {
  const [channel, setChannel] = useState<any>(null);
  const { channelId } = useRouter().query;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const fetchChannel = async () => {
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

      const response = await axios.get(`/api/channel/${channelId}`, config);

      if (response.status === 200) {
        const channelData = response.data.channel;
        setChannel(channelData);
        setValue('name', channelData.name);
      } else {
        console.log('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Internal server error');
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  const handleAddMember = async (memberId: any) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('Unauthorized');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`/api/channel/${channelId}/members`, { members: [memberId] }, config);

      if (response.status === 200) {
        console.log('Member added successfully');
      } else {
        console.error('Failed to add member');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Internal server error');
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('Unauthorized');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(`/api/channel/${channelId}`, { name: data.name }, config);

      if (response.status === 200) {
        console.log('Channel name updated successfully');
      } else {
        console.error('Failed to update channel name');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Internal server error');
    }
  };

  return (
    <div>
      <h2>Edit Channel</h2>

      {channel && (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label>Channel Name</label>
            <input type="text" {...register('name')} />
            {errors.name && <p>error</p>}
          </div>

          <div>
            <label>Members</label>
            <ul>
              {channel.members.map((member: any) => (
                <li key={member.id}>{member.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <label>Add Member</label>
            <input type="text" {...register('memberId')} />
            <button type="button" onClick={() => handleAddMember(getValues('memberId'))}>
              Add
            </button>
          </div>

          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
