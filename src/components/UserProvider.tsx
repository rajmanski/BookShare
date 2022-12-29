import { createContext, ReactElement, FC, useState } from 'react';

interface UserContextState {
    userName: string;
    setUserName: (userName: string) => void;
    email: string;
    setEmail: (email: string) => void;
}

interface UserProviderProps {
    children: ReactElement;
}

const defaultUserContextValue = {} as UserContextState;
export const UserContext = createContext(defaultUserContextValue);

export const UserProvider: FC<UserProviderProps> = ({children}) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    return (
        <UserContext.Provider 
            value={{
                userName, setUserName, 
                    email, setEmail, 
                    }}>
            {children}
        </UserContext.Provider>
    )
}