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
            setIsAdmin(parsedUser.admin);
            localStorage.setItem('user', JSON.stringify({ admin: parsedUser.admin }));
          } catch (parseError) {
            console.error('Error parsing user data from localStorage:', parseError);
            localStorage.setItem('user', JSON.stringify({ admin: false }));
            setIsAdmin(false);
          }
        } else {
          localStorage.setItem('user', JSON.stringify({ admin: false }));
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        localStorage.setItem('user', JSON.stringify({ admin: false }));
        setIsAdmin(false);
      }
      finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []); 

  return { isAdmin, isLoading }; 
}

export { useAdmin };
