import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { FormInput } from '../../type/form'

const schema = yup.object({
  name: yup.string().max(30).required(),
  email: yup.string()
    .required()
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address'),
  password: yup.string().min(4).required(),
  confirmPassword: yup.string().min(4).required(),
  bio: yup.string()
});

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormInput> = data => {
    axios.post('/api/signup', data)
      .then(response => {
        if(response.status === 200){
          console.log('Register with success');
          router.push('/login')
        }else {
          setError('Failed to create user')
        }
      })
      .catch(error => {
        setError('Internal server error')
        console.log(error);
        
      })
  };

  return (
    <>
      <div>
        <div>
          <h1>Sign up</h1>
          <p>Please fill in this form to create an account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register('name')} placeholder='Your name...' />
          {errors.name && <p>{errors.name.message}</p>}
          <input type="email" {...register('email')} placeholder='Your email...' />
          {errors.email && <p>{errors.email.message}</p>}
          <input type="password" {...register('password')} placeholder='Your password...' />
          {errors.password && <p>{errors.password.message}</p>}
          <input type="password" {...register('confirmPassword')} placeholder='Confirm your password...' />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <button type="submit">Sign up</button>
        </form>

        <div>
          <button onClick={() => router.push('/login')}>Login</button>
        </div>
      </div>
    </>
  );
}
