"use client"
import Button from "@/components/Button";
import { userSchema } from "@/schemas/userSchema";
import { ErrorSpan, Input } from "@/styles/AuthForm.style";
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from 'zod';


const formType = userSchema.omit({name:true});

type LoginFormProps = z.infer<typeof formType>;

export function LoginPage() {

    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm<LoginFormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(formType),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    
    const handleLogin = async (data: LoginFormProps) => {
        
        const {email, password} = data;
        
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            toast.error(result.error);
            return;
        }
        
        router.replace("/home");
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div>
                <Input type="email" {...register('email')} placeholder="Email:" />
                {errors.email?.message && (
                    <ErrorSpan>{errors.email?.message}</ErrorSpan>
                )}
            </div>
            <div>
                <Input type="password" {...register('password')} placeholder="Senha:" />
                {errors.password?.message && (
                    <ErrorSpan>{errors.password?.message}</ErrorSpan>
                )}
            </div>
            <Button text="Entrar" />
        </form>
    )
};

