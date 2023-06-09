import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';

interface Channel {
    id: string;
    name: string;
    type: string;
}

interface ChannelListProps {
    selectedType: string | null;
}

export default function ChannelList({ selectedType }: ChannelListProps) {
    const [channels, setChannels] = useState<Channel[]>([]);
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

    const filteredChannels = selectedType
        ? channels.filter((channel) => channel.type === selectedType)
        : channels;

    return (
        <div>

            <div >
                {filteredChannels.map((channel: Channel) => (
                    <Nav.Link key={channel.id} href={`/channel/${channel.id}`}>
                        <div className="list-group-item">
                            <h2>{channel.name}</h2>
                        </div>
                    </Nav.Link>
                ))}
            </div>
        </div>
    );
}
