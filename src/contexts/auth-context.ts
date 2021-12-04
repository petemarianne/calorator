import { createContext } from 'react';

interface DefaultAuth  {
    userID: string | null,
    token: string | null,
    login: (arg0: string, arg: string) => void,
    logout: () => void,
};

const defaultAuth: DefaultAuth = {
    userID: null,
    token: null,
    login: () => {},
    logout: () => {},
};

export const AuthContext = createContext(defaultAuth);
