import {createContext, useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import authService from "../services/authService";
import {setAuthToken} from "../utils/backend.instance";

export const PermissionContext = createContext({permissions: [], groups: []});

export const PermissionProvider = ({ children }) => {
    const {refreshToken} = useSelector(state => state.auth)
    const [permissions] = useState([]);
    const [groups] = useState([]);

    useEffect(()=>{
        authService.getAccessToken(refreshToken).then(response => {
            setAuthToken(response.data?.access)
        })
    },[refreshToken])
    return (
        <PermissionContext.Provider value={{ permissions, groups }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermissions = () => {
    return useContext(PermissionContext)
}