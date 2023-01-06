import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import styled from "styled-components";
import { Popover, Button, Typography } from "@mui/material";
import { apiLogin } from "./api";
import SimpleSnackbar from "../../commons/notification";
import { useNavigate } from "react-router-dom";

const Login = () => {
    async function handleCreateUser(user: any) {
        console.log(user);
        // const res = await apiLogin(user.credential)
        // if(res){

        // }else{

        // }
    }
    const navigate = useNavigate();

    return (
        <>
            <SLogin>
                <GoogleOAuthProvider clientId="919315885601-82rssgelt9qsnihhk8ioc9aiv4jir8u4.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleCreateUser(credentialResponse);
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                    />
                </GoogleOAuthProvider>
            </SLogin>
            <SimpleSnackbar />
        </>
    );
};

export default Login;

const SLogin = styled.div`
    width: 500px;
    height: 500px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;
