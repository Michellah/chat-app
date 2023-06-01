import { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { FormInput } from '@/type/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils/signupValidation';
import Cookies from 'js-cookie';

const RegistrationForm: React.FC<any> = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema)
  })
  const fetchProfile = async (data: FormInput) => {
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
          axios
          .post('/api/auth/signup', data)
          .then((response) => {
            
            router.push('/channel');
          })
          .catch((error) => {
            setError('Identifiants invalides');
            console.error('Erreur:', error);
          });
        } else {
            console.log('An error occurred');
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('name')} placeholder='Your name' />
      <p> {errors.name?.message} </p>

      <input type="email" {...register('email')} placeholder='Your email' />
      <p> {errors.email?.message} </p>

      <input type="password" {...register('password')} placeholder='Your password'/>
      <p> {errors.password?.message} </p>

      <input type="password" {...register('confirmPassword')} placeholder='Confirm your password'/>
      <p> {errors.confirmPassword?.message} </p>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default RegistrationForm;
