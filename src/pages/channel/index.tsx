import ChannelList from '@/component/ChannelList';
import SendMessageForm from '@/component/SendMessageForm';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Profile.css.module.css'

export default function IndexPage() {
  return (
    <div className={styles.profile}>
      <div className="container">
      <h1 className="text-center">Welcome to the Channel App</h1>
      <Link href="/channel/create">
        <p className="btn btn-primary create-channel-link">Create a new channel</p>
      </Link>
      <style jsx>{`
        .create-channel-link {
          margin-top: 20px;
        }
      `}</style>
    </div>
    </div>
    
  );
}
