
import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import axiosInstance, {
  setTokenGetter,
} from "../library/axios.js";

export default function AuthTokenSetup() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setTokenGetter(null);
      return;
    }

    setTokenGetter(getToken);

    let cancelled = false;

    const syncUser = async () => {
      try {
        const token = await getToken();

        if (!token) {
          console.error("Clerk token belum tersedia");
          return;
        }

        await axiosInstance.post("/users/sync");
        if (!cancelled) {
          console.log("User sync berhasil");
        }
      } catch (error) {
  console.error("User sync gagal");
  console.error("Status:", error.response?.status);
  console.error("Pesan:", error.response?.data);
  console.error("Detail:", error.message);
}
    };

    syncUser();

    return () => {
      cancelled = true;
    };
  }, [getToken, isLoaded, isSignedIn]);

  return null;
}
