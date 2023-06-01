import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { userType } from "@/type/user";
import EditProfilePage from "./EditProfile";

const ProfilePage = () => {
  const [user, setUser] = useState<userType | undefined>(undefined);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      } 

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("/api/users/user", config);

      if (response.status === 200) {
        const userData = response.data.user;
        setUser(userData);
      } else {
        console.log('error');
        
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleProfileUpdated = () => {
    fetchProfile();
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      {user ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">Created at: {user.createdAt}</p>
            <p className="card-text">Name: {user.name}</p>
            <p className="card-text">Email: {user.email}</p>
            <p className="card-text">Bio: {user.bio}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        {!isEditing && !isProfileUpdated && (
          <button className="btn btn-primary" onClick={handleEditButtonClick}>Edit Profile</button>
        )}
        {isEditing && (
          <EditProfilePage
            initialData={user}
            onProfileUpdated={handleProfileUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
