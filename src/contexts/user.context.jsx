import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// The actual value that you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

// This is the component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
       
        return unsubscribe;
    }, []);

 return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}