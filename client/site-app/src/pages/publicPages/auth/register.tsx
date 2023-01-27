import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf, number } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import styled from "styled-components";
import { apiCreateUser, apiCreateUserWithToken } from "../api";
import CloseIcon from "@mui/icons-material/Close";
import { history } from "../../../utils/history";
import { notify } from "../../../commons/notification";
import { useNavigate } from "react-router-dom";

const registerSchema = object({
    age: string().max(2, "Tên quá độ tuổi tối đa"),
    name: string()
        .nonempty("Tên không được bỏ trống")
        .max(32, "Tên quá độ dài tối đa"),
    email: string().nonempty("Email bắt buộc điền").email("Email không hợp lệ"),
    password: string()
        .nonempty("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải tối thiểu 8 ký tự")
        .max(32, "Mật khẩu không được dài quá 32 ký tự"),
});

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    type RegisterInput = TypeOf<typeof registerSchema>;

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

    const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
        setLoading(true);
        await apiCreateUser(values);
        notify.success(
            "Đăng ký khoản thành công, vui lòng đăng nhập lại để xác nhận"
        );
        setLoading(false);
        navigate("/login");
    };

    async function handleCreateUserWithGoogle(user: any) {
        await apiCreateUserWithToken(user?.credential || "");
        notify.success("Tạo tài khoản thành công!");
        localStorage.setItem("token", user);
        navigate("/learn");
    }

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
                        navigate("/login");
                    }}
                    variant="contained"
                >
                    Đăng nhập
                </Button>
            </div>
            <div className="body">
                <div className="title">Đăng ký</div>
                <div className="form">
                    <Box sx={{ maxWidth: "30rem" }}>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmitHandler)}
                        >
                            <TextField
                                sx={{ mb: 2 }}
                                label="Tên"
                                fullWidth
                                type="text"
                                error={!!errors["name"]}
                                helperText={
                                    errors["name"] ? errors["name"].message : ""
                                }
                                {...register("name")}
                            />
                            <TextField
                                sx={{ mb: 2 }}
                                label="Tuổi"
                                fullWidth
                                type="number"
                                error={!!errors["age"]}
                                helperText={
                                    errors["age"] ? errors["age"].message : ""
                                }
                                {...register("age")}
                                onChange={(e) => {
                                    console.log(typeof e.target.value);
                                }}
                            />

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
                                Đăng ký
                            </LoadingButton>
                        </Box>
                    </Box>
                    <div className="separation">
                        <p>Hoặc</p>
                        <div className="line"></div>
                    </div>
                </div>
                <GoogleOAuthProvider clientId="919315885601-82rssgelt9qsnihhk8ioc9aiv4jir8u4.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleCreateUserWithGoogle(credentialResponse);
                        }}
                        onError={() => {
                            console.log("Register Failed");
                            notify.error("Đăng ký không thành công");
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
        </SLogin>
    );
};

export default Register;

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
        .form {
            button {
                color: white;
            }
        }
    }
`;
