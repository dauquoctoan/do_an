import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import {
    Box,
    Button,
    TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import styled from "styled-components";
import { apiLogin } from "../api";
import CloseIcon from "@mui/icons-material/Close";
import { history } from "../../../utils/history";

const registerSchema = object({
    age: string()
        .nonempty("Vui lòng nhập tuổi")
        .max(32, "Bạn đã quá số tuổi quy định")
        .min(0, "Bạn chưa đủ độ tuổi quy định"),
    name: string()
        .nonempty("Tên không được bỏ trống")
        .max(32, "Tên quá độ dài tối đa"),
    email: string().nonempty("Email bắt buộc điền").email("Email không hợp lệ"),
    password: string()
        .nonempty("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải tối thiểu 8 ký tự")
        .max(32, "Mật khẩu không được dài quá 32 ký tự"),
});

const Login = () => {
    type RegisterInput = TypeOf<typeof registerSchema>;
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            // reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        console.log(values);
    }
    async function handleCreateUser(user: any) {
        const res = await apiLogin(user.credential);
        if (res) {
            console.log(res);
        } else {
            console.log("error");
        }
    }

    // const login = useGoogleLogin({
    //     onSuccess: codeResponse => console.log(codeResponse),
    //     flow: 'auth-code',
    // });

    return (
        <SLogin>
            <div className="head">
                <CloseIcon
                    onClick={() => {
                        history.back();
                    }}
                />
                <Button
                    onClick={() => {
                        setIsLogin(!isLogin);
                    }}
                    variant="contained"
                >
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </Button>
            </div>
            <div className="body">
                <div className="title">{isLogin ? "Đăng nhập" : "Đăng ký"}</div>
                <div className="form">
                    <Box sx={{ maxWidth: "30rem" }}>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmitHandler)}
                        >
                            {!isLogin && (
                                <>
                                    <TextField
                                        sx={{ mb: 2 }}
                                        label="Tên"
                                        fullWidth
                                        required
                                        type="text"
                                        error={!!errors["name"]}
                                        helperText={
                                            errors["name"]
                                                ? errors["name"].message
                                                : ""
                                        }
                                        {...register("name")}
                                    />
                                    <TextField
                                        sx={{ mb: 2 }}
                                        label="Tuổi"
                                        fullWidth
                                        required
                                        type="number"
                                        error={!!errors["age"]}
                                        helperText={
                                            errors["age"]
                                                ? errors["age"].message
                                                : ""
                                        }
                                        {...register("age")}
                                    />
                                </>
                            )}
                            <TextField
                                sx={{ mb: 2 }}
                                label="Email"
                                fullWidth
                                required
                                type="email"
                                error={!!errors["email"]}
                                helperText={
                                    errors["email"]
                                        ? errors["email"].message
                                        : ""
                                }
                                {...register("email")}
                            />
                            <TextField
                                sx={{ mb: 2 }}
                                label="Password"
                                fullWidth
                                required
                                type="password"
                                error={!!errors["password"]}
                                helperText={
                                    errors["password"]
                                        ? errors["password"].message
                                        : ""
                                }
                                {...register("password")}
                            />
                            <LoadingButton
                                variant="contained"
                                fullWidth
                                type="submit"
                                loading={loading}
                                sx={{ py: "0.8rem", mt: "1rem" }}
                            >
                                {isLogin ? "Đăng nhập" : "Đăng ký"}
                            </LoadingButton>
                        </Box>
                    </Box>
                    <div className="separation">
                        <p>Hoặc</p>
                        <div className="line"></div>
                    </div>
                </div>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID || ''}>
                    {/* <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleCreateUser(credentialResponse);
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                    /> */}
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />;
                    {/* <MyCustomButton onClick={() => login()}>
                        Sign in with Google 🚀{' '}
                    </MyCustomButton>; */}
                </GoogleOAuthProvider>
                
            </div>
        </SLogin>
    );
};

export default Login;

const SLogin = styled.div`
    width: 100%;
    height: 100vh;
    .head {
        width: auto;
        padding: 10px 20px;
        height: auto;
        display: flex;
        justify-content: space-between;
    }
    .body {
        width: 700px;
        height: calc(100vh - 70px);
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            font-size: 26px;
            margin: 10px 0 15px;
            text-align: center;
            font-weight: 700;
        }
        .separation {
            margin: 10px 0px;
            text-align: center;
            position: relative;
            display: flex;
            justify-content: center;
            .line {
                position: absolute;
                width: 100%;
                top: 50%;
                border-bottom: 1px solid #e5e5e5;
            }
            p {
                background-color: white;
                width: auto;
                padding: 0px 10px;
                z-index: 1;
            }
        }
    }
`;
const MyCustomButton = styled.button`
    
`