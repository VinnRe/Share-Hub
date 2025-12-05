import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { endpoints } from '../config/config';

export const useAccountUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth(); 

  const updateAccount = async (updatedInfo: { name?: string; email?: string; password?: string; }) => {
    setIsLoading(true);
    setError(null);

      const payload = {
        ...updatedInfo,
        user: {
          _id: user?._id
      }
      };

      console.log("Request payload:", JSON.stringify(payload))

      const response = await fetch(endpoints.updateProfile, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to update account');
      }

      setIsLoading(false);

  };

  return { updateAccount, isLoading, error };
};