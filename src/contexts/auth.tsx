import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStoarage from '@react-native-community/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

interface User{
    name: string;
    email: string;
}

interface AuthContextData{
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadStoragedData(){

            const storagedUser = await AsyncStoarage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStoarage.getItem('@RNAuth:token');

            if(storagedUser && storagedToken){
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadStoragedData();

    }, []);

    async function signIn(){

        const response = await auth.signIn();
        setUser(response.user);

        api.defaults.headers.Authorization = `Bearer ${response.token}`;
        
        // use AsyncStorage for React Native | LocalStorage for ReactJS
        await AsyncStoarage.setItem('@RNAuth:user', JSON.stringify(response.user));
        await AsyncStoarage.setItem('@RNAuth:token', response.token);

    }

    function signOut(){

        AsyncStoarage.clear().then(() => {
            setUser(null);
        });

    }

    return(
    <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
    );

};

export function useAuth(){

    const context = useContext(AuthContext);
    return context;

}