import RegistrationForm from "@/component/RegistrationForm"
import Link from "next/link";

const RegisterPage: React.FC = () => {
  return (
    <>
      <p>Create a new count</p>
      <RegistrationForm />

      <Link href='login'>Log in</Link>
    </>
  )
}

export default RegisterPage;
