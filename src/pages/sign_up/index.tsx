import RegistrationForm from "@/component/RegistrationForm"
import Link from "next/link";
import styles from '../../styles/Register.module.css'

const RegisterPage: React.FC = () => {
  return (
    <>
      <div className={styles.login}>

        <h1>Signup</h1>
        <RegistrationForm />

        <Link href='login'>Log in</Link>
      </div>
    </>
  )
}

export default RegisterPage;
