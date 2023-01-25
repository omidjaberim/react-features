import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { getPermissionsFromToken } from "tools/pure-function/jwtDecoder"


interface IProp {
    permission :string;
    children : React.ReactElement;
}
//  Array<string>


const ProtectedRoute = (props:IProp) :React.ReactElement=>{
    const tokenObj  = useAppSelector((store : any) =>  store.token);
    const {permission ,children } = props
    
    if (tokenObj && Object.keys(tokenObj) && Object.keys(tokenObj).length) {
        const permissions = getPermissionsFromToken(tokenObj?.data?.access_token)
        // const arrayPermision : string = permission.join(',')
        if (permissions.includes(permission)) { 
            return <Navigate to="/" replace />;
        }
    }
    return children;
}
export default ProtectedRoute