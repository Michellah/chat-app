import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ChannelList() {
    const [channels, setChannels] = useState<any>([]);
    const router = useRouter();

    const fetchChannels = async () => {
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

            const response = await axios.get('/api/channel/channelList', config);

            if (response.status === 200) {
                const channelData = response.data.channels;
                setChannels(channelData);
            } else {
                console.log('An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Internal server error');
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    return (
        <div className="channel-list">
            <h1>ChannelList</h1>

            <div className="list-group">
                {channels.map((channel: any) => (
                    <Link key={channel.id} href={`/message/${channel.id}`} passHref>
                        <div className="list-group-item">
                            <h2>{channel.name}</h2>
                            <p>Type: {channel.type}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
