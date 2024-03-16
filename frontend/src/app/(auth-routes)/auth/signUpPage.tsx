"use client"
import Button from "@/components/Button";
import { UserSchema } from "@/schemas/userSchema";
import { SignupService } from "@/service/signupService";
import { ErrorSpan } from "@/styles/ErrorSpan.style";
import { Input } from "@/styles/Input.style";
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from 'zod';

type FormProps = z.infer<typeof UserSchema>;

export function SignUpPage() {

    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const handleSignUp = async (data: FormProps) => {

        let errorMessage = "";

        try {
            let status = 0;

            const { name, email, password } = data;

            const service = new SignupService();

            await service.signup(name, email, password).then(resp => {
                status = resp.status;
            }).catch((error) => {
                status = error.status;
                errorMessage = error.response.data.details;
                throw new Error(error.response.data.details);
            });


            if (status == 201) {

                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    toast.error(result.error);
                    return;
                }

                router.replace("/dashboard");

                return
            }


        } catch (error) {
            toast.error(String(errorMessage), { style: { fontFamily: "Poppins" } });
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
