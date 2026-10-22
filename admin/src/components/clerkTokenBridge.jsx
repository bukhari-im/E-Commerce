
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import axiosInstance, {
  setTokenGetter,
} from "../library/axios.js";

export default function ClerkTokenBridge({ children }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      if (!isLoaded) return;

      if (!isSignedIn) {
        setTokenGetter(null);
        if (!cancelled) setReady(true);
        return;
      }

      setTokenGetter(getToken);

      try {
        await axiosInstance.post("/users/sync");

        if (!cancelled) setReady(true);
      } catch (error) {
        console.error(
          "Failed to synchronize user:",
          error.response?.data || error.message
        );

        if (!cancelled) setReady(true);
      }
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);

  if (!ready) return null;

  return children;
}
