import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Cookies from "js-cookie";
import { editProfileSchema } from "@/utils/editProfileValidation";
import { EditProfilePageProps } from "@/type/editProfilePageProps";
import { userType } from "@/type/user";

const EditProfilePage: React.FC<EditProfilePageProps> = ({ initialData, onProfileUpdated }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Unauthorized');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios.put("/api/users/editUser", data, config);

      if (response.status === 200) {
        const filteredData: Partial<userType> = {};
        Object.keys(data).forEach((key) => {
          if (data[key as keyof typeof data]) {
            filteredData[key as keyof userType] = data[key as keyof userType];
          }
        });

        setSuccess(true);
        setError("");
        onProfileUpdated(filteredData);
      } else {
        setError("An error occurred");
      }
    } catch (error) {
      setError("Internal server error");
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" {...register("name")} defaultValue={initialData?.name || ""} />
        </div>

        <div>
          <label htmlFor="">Bio</label>
          <input type="text" {...register("bio")} defaultValue={initialData?.bio || ""} />
        </div>
        <div>
          <label>Old Password:</label>
          <input type="password" {...register("oldPassword")} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" {...register("newPassword")} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Profile updated successfully!</p>}
    </div>
  );
};

export default EditProfilePage;

