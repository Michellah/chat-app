import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoginFormProps from '@/type/loginFormProps';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { FormInput } from '@/type/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils/formValidation';

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [error, setError] = useState('');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<FormInput> = data => {
    axios
      .post('/api/auth/login', data)
      .then((response) => {
        const token = response.data;
        console.log(token);
        
        if (token) {
          // Enregistrer le token dans un cookie
          Cookies.set('token', token);

          // Appeler la fonction de rappel onLogin avec le token
          onLogin(token);
          console.log(token);

          router.push('/channel');
        } else {
          setError('Identifiants invalides');
        }
      })
      .catch((error) => {
        setError('Identifiants invalides');
        console.error('Erreur:', error);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email')} placeholder='Your email' />
      <p> {errors.email?.message} </p>

      <input type="password" {...register('password')} placeholder='Your password'/>
      <p> {errors.password?.message} </p>

      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;
