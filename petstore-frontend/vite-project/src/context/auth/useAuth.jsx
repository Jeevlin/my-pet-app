import { useState, useEffect } from 'react';
import { auth } from '../../component/firebase'
import { signOut ,onAuthStateChanged} from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  

  

  const logout = () => signOut(auth);

  return { user, logout ,loading};
};

export default useAuth;
