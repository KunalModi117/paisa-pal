import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const useGetUser = () => {
  const session = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session.data?.user) setUser(session.data.user);
  }, [session]);

  return { user, isUserLoading: session.status };
};
