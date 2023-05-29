import { userType } from "./user";

export interface EditProfilePageProps {
    initialData?: userType;
    onProfileUpdated: (data: userType) => void;
  }