import { useContext,createContext } from "react";
import useAuth from "./useAuth";

const AuthContext = createContext();


export const AuthProvider=({children})=>{
    const auth = useAuth()

return(
    <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
);
}
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
  };
  