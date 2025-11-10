
import { MMKV } from 'react-native-mmkv';

export const tokenStorage = new MMKV();

export const storage = new MMKV({
    id: 'my-app-storage',
    encryptionKey: 'some-secret',
});

// This is a wrapper object(mmkvstorage) that provides three basic storage methods
export const mmkvStorage = {
    setItem: (key: string, value: string) => {
            storage.set(key, value);
    },
    getItem: (key: string) => {
            const value = storage.getString(key);
            return value ?? null;
    },
    removeItem: (key: string) => {
            // runtime API uses `remove` to delete a key
            storage.delete(key);
    },
};