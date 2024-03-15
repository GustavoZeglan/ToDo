"use client"
import Button from "@/components/Button";
import { userSchema } from "@/schemas/userSchema";
import { SignupService } from "@/service/signupService";
import { ErrorSpan, Input } from "@/styles/AuthForm.style";
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from 'zod';

type FormProps = z.infer<typeof userSchema>;

export function SignUpPage() {

    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const handleSignUp = async (data: FormProps) => {

        // let errorMessage = "";

        try {
        const { name, email, password } = data;

        // const response = await axios.post('http://localhost:5000/signup', { name: name, email: email, password: password })
        // .catch((error) => {
        //     throw new Error(error.response.data.details);
        //   }) || null;

        const service = new SignupService();

        const response = await service.signup(name, email, password).catch((err) => {
            throw new Error(err.details);
        });

        if (response.status == 201) {

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

            return
        }

        } catch (err) {
            toast.error(String(err));
        }

    }

    return (
        <form onSubmit={handleSubmit(handleSignUp)}>
            <div>
                <Input type="text" {...register('name')} placeholder="Nome:" />
                {errors.name?.message && (
                    <ErrorSpan>{errors.name?.message}</ErrorSpan>
                )}
            </div>
            <div>
                <Input type="email" {...register('email')} placeholder="Email:" />
                {errors.email?.message && (
                    <ErrorSpan>{errors.email?.message}</ErrorSpan>
                )}
            </div>
            <div>
                <Input type={'password'} {...register('password')} placeholder="Senha:" />
                {errors.password?.message && (
                    <ErrorSpan>{errors.password?.message}</ErrorSpan>
                )}
            </div>
            <Button text="Cadastrar" />
        </form>
    )
};
