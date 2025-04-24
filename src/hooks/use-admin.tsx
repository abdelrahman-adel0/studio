import { useState, useEffect } from 'react';

function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          try {
            const parsedUser = JSON.parse(user);
            setIsAdmin(parsedUser?.admin || false); // Safely access admin property
          } catch (parseError) {
            console.error('Error parsing user data from localStorage:', parseError);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isAdmin, isLoading };
}

export { useAdmin };
