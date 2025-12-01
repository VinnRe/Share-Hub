import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { endpoints } from "../config/config"

export const useCreate = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { token, user } = useAuth();
    
    const createList = async (tags: string, title: string, details: string, media: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const payload = { 
                title,
                details,
                tags,
                media,
                creator: user
            };

            console.log("Request payload:", JSON.stringify(payload));

            const response = await fetch(endpoints.createItem, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            const json = await response.json();
            console.log("Response:", json);

            if (!response.ok) {
                setError(json.error || 'Failed to create list');
                return;
            }

            // Success - optionally refresh user data
            if (user) {
                // Update counts if backend returns updated user
                console.log("JSADNA")
            }
            
        } catch (err) {
            setError('Network error occurred');
            console.error("SADASD: ", err)
        } finally {
            setIsLoading(false);
        }
    };

    return { createList, isLoading, error };
};
