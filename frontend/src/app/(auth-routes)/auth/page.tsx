"use client"
import { StyledLink, Title } from "@/styles/AuthPage.style"
import React, { useState } from "react"
import AuthLayout from "./layout"
import { LoginPage } from "./loginPage"
import { SignUpPage } from "./signUpPage"

const AuthPage: React.FC = () => {

    const [isLogin,setIsLogin] = useState(true);

    const handleIsLogin = () => {
        const value = isLogin ? false : true;
        setIsLogin(value)
    }

    return (
        <>
            <AuthLayout>
                    {isLogin ? <>
                        <Title>Login</Title>
                        <LoginPage></LoginPage>
                        <StyledLink onClick={handleIsLogin}>Não possui cadastro?</StyledLink>
                    </> : 
                    <>
                        <Title>Cadastro</Title>
                        <SignUpPage></SignUpPage>
                        <StyledLink onClick={handleIsLogin}>Já é cadastrado?</StyledLink>
                    </>
                    }
            </AuthLayout>
        </>
    )
}


export default AuthPage