import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
    return (
        <div>
            <GoogleOAuthProvider clientId="919315885601-82rssgelt9qsnihhk8ioc9aiv4jir8u4.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default Login;
