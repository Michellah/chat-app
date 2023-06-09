import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { schema } from "@/utils/loginValidation";
import styles from '../styles/Login.module.css'

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const token = response.data.user.token;
        Cookies.set("token", token, { expires: 10 });
        router.push('/profile')

      } else {
        console.log(errors);

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>

      <div >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          <input type="email" {...register("email")} name="email" placeholder="Your email..." />

          <input type="password" {...register("password")} name="password" placeholder="Your password..." />

          <button type="submit" className="loginButton">Login</button>
        </form>
      </div>
    </>

  );
};

export default LoginForm;
