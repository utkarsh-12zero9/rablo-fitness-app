'use client'

export const STORAGE_KEYS = {
    USER_ID: 'userID',
    ACC_CREATED: 'accCreated',
    AUTH_TOKEN: 'authToken',
    USER_NAME: 'userName',
    USER_EMAIL: 'userEmail',
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

export const removeStorageItem = (key: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const clearAppStorage = (): void => {
    if (typeof window !== 'undefined') {
        removeStorageItem(STORAGE_KEYS.USER_ID);
        removeStorageItem(STORAGE_KEYS.ACC_CREATED);
        removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
        removeStorageItem(STORAGE_KEYS.USER_NAME);
        removeStorageItem(STORAGE_KEYS.USER_EMAIL);
    }
};