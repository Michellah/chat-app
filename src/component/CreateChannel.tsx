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
import styles from '../styles/Profile.css.module.css'

export default function CreateChannelForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<ChannelType>({
        resolver: yupResolver(channelSchema),
    });
    const [selectedMembers, setSelectedMembers] = useState<{ value: string; label: string }[]>([]);
    const [error, setError] = useState('');
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

    const handleFormSubmit = async (data: ChannelType) => {
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

            if (data.type === 'public') {
                data.members = [];
            }
            const response = await axios.post('/api/channel/createChannel', data, config);
            router.push('/channel');
            // window.location.href='/channel'

        } catch (error) {
            setError('Internal server error');
        }
    };

    return (
        <div className={styles.profile }>
            <div className="container">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register('name')} name='channelName' />
                    {errors && errors.name?.message}
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type</label>
                    <select className="form-select" id="type" {...register('type')} name='type'>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                {getValues('type') === 'private' && (
                    <div className="mb-3">
                        <label className="form-label">Members</label>
                        <Select
                            isMulti
                            options={user.map((user) => ({ value: user.id, label: user.name }))}
                            onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions as { value: string; label: string; }[];
                                setSelectedMembers(selectedValues);
                                setValue('members', selectedValues.map((option) => option.value));
                            }}
                        />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>

        </div>
            );
}
