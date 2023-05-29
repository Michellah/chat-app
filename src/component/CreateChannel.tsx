import { ChannelType } from '@/type/channelType';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { channelSchema } from '@/utils/channelValidation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { userType } from '@/type/user';

export default function CreateChannel() {
    const { register, handleSubmit, formState: { errors } } = useForm<ChannelType>({
        resolver: yupResolver(channelSchema)
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const [user, setUser] = useState<userType[]>([]);
    const fetchProfile = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get("/api/users/allUser", config);

            if (response.status === 200) {
                const userData = response.data.users;
                setUser(userData);
                console.log(response.data.users);

            } else {
                // Gérer les erreurs
            }
        } catch (error) {
            // Gérer les erreurs
        }
    };
    useEffect(() => {
        fetchProfile();
    }, [])

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
            const response = await axios.post("/api/channel/createChannel", data, config);
            if (response.status === 200) {
                router.push('/channel')
                console.log('create');
                
            } else {
                setError("An error occurred");
            }
        } catch (error) {
            setError("Internal server error");
        }
    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder='name' {...register('name')} />
                    <select {...register('type')}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                    {user && user.map((users: userType) => (
                        <div key={users.id}>
                            <input
                                type="checkbox"
                                id={users.id}
                                value={users.id}
                                {...register('members', { required: true })}
                            />
                            <label htmlFor={users.id}>{users.name}</label>
                        </div>
                    ))}

                    <button>Create</button>
                </form>
            </div>
        </>
    )
}
