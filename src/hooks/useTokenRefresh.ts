import { useEffect } from 'react';
import api from '../utils/api/api';


const useTokenRefresh = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      api.post('/auth/refresh-token', { token: localStorage.getItem('refreshToken') })
        .then(response => {        
          localStorage.setItem('accessToken', response.data.accessToken);
        })
        .catch(error => {
          console.error('Failed to refresh token', error);
        });
    }, 50 * 60 * 1000); 

    return () => clearInterval(interval); 
  }, []);
};

export default useTokenRefresh;
