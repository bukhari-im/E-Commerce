
import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import axiosInstance from "../library/axios.js";

function SyncUser() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      try {
        const { data } = await axiosInstance.post("/users/sync");

        console.log("User sync berhasil:", data.message);
      } catch (error) {
        console.error(
          "User sync gagal:",
          error.response?.status,
          error.response?.data
        );
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn]);

  return null;
}

export default SyncUser;
