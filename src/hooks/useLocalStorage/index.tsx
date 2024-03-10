import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const storedValue = JSON.parse(localStorage.getItem(key) || 'null') || initialValue;

    const [value, setValue] = useState<T>(storedValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
};