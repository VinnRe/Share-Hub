import { useState } from "react";
import { endpoints } from "../config/config";

export const useFileUpload = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const uploadFile = async (file: File): Promise<boolean | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            const token = localStorage.getItem("token");

            const response = await fetch(endpoints.fileUpload, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const json = await response.json();
            console.log("HOTDOG: ", json)

            if (!response.ok) {
                throw new Error(json.error || 'Upload failed');
            }

            setError(null);
            
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Upload failed');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { uploadFile, isLoading, error };
};
;