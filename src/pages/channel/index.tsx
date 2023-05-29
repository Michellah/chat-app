import CreateChannel from '@/component/CreateChannel'
import LogoutButton from '@/component/Logout'
import Link from 'next/link'
import React from 'react'

export default function index() {
  return (
    <div>index
      <LogoutButton />
      <Link href={'/channel/create'}>Create</Link>
    </div>
  )
}
