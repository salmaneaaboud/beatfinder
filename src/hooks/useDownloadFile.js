import { useCallback } from "react";

const useDownloadFile = () => {
    const downloadFile = useCallback(async (url, filename) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("No se pudo descargar el archivo");

            const blob = await response.blob();
            const link = document.createElement("a");

            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
        }
    }, []);

    return downloadFile;
};

export default useDownloadFile;
