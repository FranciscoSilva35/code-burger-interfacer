import React from "react";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';


import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import Button from "../../components/Button";
import api from "../../services/api"
import RegisterImg from "../../assets/register-image.svg"
import Logo from "../../assets/logo.svg"

import {
    Container,
    RegisterImage,
    ContainerItens,
    Label,
    Input,
    // Button,
    SignInLink,
    ErrorMessage

} from "./styles"


function Register() {

    const schema = Yup.object().shape({

        name: Yup.string().required(" O seu nome é obrigatorio!"),
        email: Yup.string()
            .email("Digite um e-mail válido")
            .required("O e-mail é Obrigatório!"),
        password: Yup.string()
            .required("A senha é Obrigatória!")
            .min(6, "A senha deve ter pelo menos 6 digitos!"),
        confirmPassword: Yup.string()
            .required("A senha é Obrigatória!")
            .oneOf([Yup.ref("password")], "As senhas devem ser iguais")


    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    // const noSubmit = data => console.log(data)

    const noSubmit = async clientData => {
        try {
            // const response = await api.post("users", {
            const { status } = await api.post("users", {
                name: clientData.name,

                email: clientData.email,

                password: clientData.password

            },
                { validateStatus: () => true })

            if (status == 201 || status == 200) {
                toast.success('🦄 Cdastro criado com sucesso!')
            }
            else if (status == 409) {

                toast.error("E-mail já cadastrado Faça login para continuar!")

            } else {

                throw new Error()

            }

        } catch (err) {

            toast.error("Falha no sistema Tente novamente!")


        }

    }

    return (

        <Container>

            <RegisterImage src={RegisterImg} alt="registerImage" />

            <ContainerItens>

                <img src={Logo} alt="logo-code-burger" />
                <h1>Cadastre-se</h1>

                <form noValidate onSubmit={handleSubmit(noSubmit)} >

                    <Label error={errors.name?.message} >Nome!</Label>
                    <Input
                        type="text"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>


                    <Label error={errors.email?.message}>Email!</Label>
                    <Input
                        type="email"
                        {...register("email")}
                        error={errors.email?.message}
                    />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label error={errors.password?.message} >Senha!</Label>
                    <Input
                        type="password"

                        {...register("password")}

                        error={errors.password?.message}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>



                    <Label error={errors.confirmPassword?.message} > Confirmar  Senha!</Label>
                    <Input
                        type="password"

                        {...register("confirmPassword")}

                        error={errors.confirmPassword?.message}
                    />
                    <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>




                    <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>Sing Up!</Button>
                </form>

                <SignInLink>

                    Já possui conta ? {""}
                    <Link style={{color: "white" }} to="/login"> Sing In </Link>


                </SignInLink>
            </ContainerItens>
        </Container>



    )

}

export default Register