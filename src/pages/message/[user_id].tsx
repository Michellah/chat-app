import React from 'react'
import DirectMessage from '../directMessage'
import EditChannel from '../channel/edit/[channel_id]'

export default function index() {
  return (
    <div>
      <DirectMessage/>
      <EditChannel/>
      
    </div>
  )
}
