'use client'

export const STORAGE_KEYS = {
    USER_ID: 'userID',
};

export const getStorageItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

export const setStorageItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};
