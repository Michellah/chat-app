import { memberSchema } from '@/utils/memberValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import React from 'react'

export default function EditChannelForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: yupResolver(memberSchema)
    });

  return (
    <div>EditChannelForm</div>
  )
}
