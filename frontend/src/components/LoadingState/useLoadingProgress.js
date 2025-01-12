import { useEffect, useState } from "react";

/**
 * useLoadingProgress Hook
 *
 * Simulates a loading progress from 0 to 100 while a `loading` state is true.
 *
 * @param {boolean} loading - The loading state to control the progress.
 * @returns {number} - The current loading progress (0-100).
 */
export function useLoadingProgress(loading) {
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        let interval = null;

        if (loading) {
            setLoadingProgress(0); // Reset progress when loading starts
            interval = setInterval(() => {
                setLoadingProgress((prev) => (prev < 100 ? prev + 10 : 100));
            }, 300);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [loading]);

    return loadingProgress;
}
