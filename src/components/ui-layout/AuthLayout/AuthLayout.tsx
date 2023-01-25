import { Suspense } from "react";
import { Grid } from "@mui/material"
import { Outlet } from "react-router-dom"

const AuthLayout  =()=>{
    return(
        <Grid className="flex flex-col h-screen w-full justify-center items-center bg-primary" >
            <Suspense fallback={null} > 
                <Outlet />
            </Suspense>
        </Grid>
    )
}
export default  AuthLayout