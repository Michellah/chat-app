import { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { FormInput } from '@/type/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils/signupValidation';
import styles from '../styles/Register.module.css'

const RegistrationForm: React.FC<any> = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema)
  })
  const fetchProfile = async (data: FormInput) => {
    try {
      const response = await axios.post('/api/auth/signup', data)
      if (response.status === 201) {
        console.log(response.data);
        router.push('/login')
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Internal server error');
    }
  };

  const onSubmit: SubmitHandler<FormInput> = data => {
    fetchProfile(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
      <input type="text" {...register('name')} placeholder='Your name' name='name' />
      <p> {errors.name?.message} </p>

      <input type="email" {...register('email')} placeholder='Your email' name='email'/>
      <p> {errors.email?.message} </p>

      <input type="password" {...register('password')} placeholder='Your password' name='password'/>
      <p> {errors.password?.message} </p>

      <input type="password" {...register('confirmPassword')} placeholder='Confirm your password' name='confirmPassword'/>
      <p> {errors.confirmPassword?.message} </p>
      <button type="submit" className='registerButton'>Register</button>
    </form>
  );
};

export default RegistrationForm;
