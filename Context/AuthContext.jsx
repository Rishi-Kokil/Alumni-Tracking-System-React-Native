import react, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);

const UseAuth = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    const login = async (token, role) => {
        setToken(token);
        setRole(role);
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("role", role);
    }
    const logout = async () => {
        setToken(null);
        setRole(null);
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("role");
    }

    useEffect(() => {
        const getData = async () => {
            const token = await SecureStore.getItemAsync("token");
            const role = await SecureStore.getItemAsync("role");
            setToken(token);
            setRole(role);
        }

        getData();

    }, [])

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContextProvider, UseAuth };