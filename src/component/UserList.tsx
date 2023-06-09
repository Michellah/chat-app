import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';

export default function UserList({ onSelectUser }: any) {
    const router = useRouter();
    const [allUser, setUser] = useState([])
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

    return (
        <div><div className="channel-list">
            <div >
                {allUser.map((user: any) => (
                     <Nav.Link key={user.id} onClick={() => onSelectUser(user)} href={`/message/${user.id}`}>
                     {user.name}
                   </Nav.Link>
                ))}
            </div>
        </div>
        </div>
    )
}
