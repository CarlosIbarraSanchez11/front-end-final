// import { create } from 'zustand';
// import { mountStoreDevtool } from 'simple-zustand-devtools';

// const useAuthStore = create((set, get) => ({
//     allUserData: null, // Use this to store all user data
//     loading: false,
//     user: () => ({
//         user_id: get().allUserData?.user_id || null,
//         username: get().allUserData?.username || null,
//     }),
//     setUser: (user) => set({ allUserData: user }),
//     setLoading: (loading) => set({ loading }),
//     isLoggedIn: () => get().allUserData !== null,
// }));

// if (import.meta.env.DEV) {
//     mountStoreDevtool('Store', useAuthStore);
// }

// export { useAuthStore };

import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { logout as logoutUtil } from '../utils/auth';

const useAuthStore = create((set, get) => ({
    allUserData: null,
    loading: false,
    user: () => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
        first_name: get().allUserData?.first_name || null,
        last_name: get().allUserData?.last_name || null,
    }),
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn: () => get().allUserData !== null,
    logout: logoutUtil,
}));

if (import.meta.env.DEV) {
    mountStoreDevtool('Store', useAuthStore);
}

export { useAuthStore };
