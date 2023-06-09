import AppNavbar from '@/component/AppNavBar'
import Profile from '@/component/Profile'
import React from 'react';
import styles from '../../styles/Profile.css.module.css'

export default function index() {
  return (
    <>
    <div className={styles.profile}>
    <Profile/>
    </div>
        
    </>
  )
}
