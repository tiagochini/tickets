import {createContext, useEffect, useState} from "react";
import api, {_token} from "./../services/api";
import {toast} from "react-toastify";


interface AuxProps {
    children: JSX.Element;
}

type User = {
    id: string;
    name: string;
    email: string;
    cover?: string;
    token?: string;
}

interface AuthContextInterface {
    signed: boolean;
    loading: boolean;
    loadingAuth: boolean;
    user: User | null;

    signUp(props: SignUpUser): void;
    signIn(props: SingInUser): void;
    signOut(): void;
    setUser(user: User | null): void;
    storageUser(user: User): void;
}

export const AuthContext = createContext({} as AuthContextInterface);

interface SignUpUser {
    name: string;
    email: string;
    password: string;
}

interface SingInUser {
    email: string;
    password: string;
}

const AuthProvider = ({children}: AuxProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    function loadStorage() {
        const storageUser = localStorage.getItem("SistemaTuring");
        if (storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadStorage();
    }, []);

    async function signUp(props: SignUpUser) {
        setLoading(true);
        await api.post(
            "/register",
            props
        ).then(
            (data) => {
                const userResponse = {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                    token: data.data.token,
                    cover: data.data.cover
                }

                setUser(userResponse);
                storageUser(userResponse);
                setLoading(false);
                toast.success("Bem vindo a Plataforma!");
            }
        ).catch((error)=>{
            console.log(error);
            toast.error("Ops algo deu errado!");
            setLoading(false);
        });
    }

    async function signIn(props: SingInUser) {
        setLoadingAuth(true);
        await api.post(
            "/login",
            {
                ...props,
                _token
            }
        ).then(
            (data) => {
                const userResponse = {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                    token: data.data.token,
                    cover: data.data.cover
                }

                setUser(userResponse);
                storageUser(userResponse);
                setLoadingAuth(false);
                toast.success("Bem vindo de volta Plataforma!");
            }
        ).catch((error) => {
            console.log(error);
            toast.error("Ops algo deu errado!");
            setLoadingAuth(false);
        });
    }

    function storageUser(user: User) {
        localStorage.setItem("SistemaTuring", JSON.stringify(user));
    }

    async function signOut() {
        setLoading(true);
        localStorage.removeItem("SistemaTuring");
        await api.post(
            "/logout",
            {
                id: user?.id,
                _token: user?.token
            },
            {
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                    accept: 'application/json'
                }
            }
        ).then(
            (data) => {
                setUser(null);
                localStorage.removeItem("SistemaTuring");
            }
        );

        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, loadingAuth, signUp, signOut, signIn,setUser,storageUser}}>
            {children}
        </AuthContext.Provider>

    );
}

export default AuthProvider;
