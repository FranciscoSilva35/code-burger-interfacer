import React from "react";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';


import { Link } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"


import { useUser } from "../../hooks/UserContext"
import Button from "../../components/Button";
import api from "../../services/api"
import LoginImg from "../../assets/login-image.svg"
import Logo from "../../assets/logo.svg"


import {
    Container,
    LoginImage,
    ContainerItens,
    Label,
    Input,
    // Button,
    SignInLink,
    ErrorMessage




} from "./styles"


function Login() {

    // const { putUserData, userData} = useUser()
    const { putUserData, userData } = useUser()
    // console.log(userData) 

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Digite um e-mail válido")
            .required("O e-mail é Obrigatório!"),
        password: Yup.string()
            .required("A senha é Obrigatória!")
            .min(6, "A senha deve ter pelo menos 6 digitos!")
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

        const { data } = await toast.promise(
            api.post("sessions", {

                email: clientData.email,

                password: clientData.password

            }),



            {
                pending: 'Verificando seus dados',
                success: 'Seja bem vindo(a) 👌',
                error: 'Verifique seu e-mail e senha 🤯'
            }
        )

        putUserData(data)


    }





    // toast.error('🦄 Deu ruim!', {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,

    // });








    //console.log(response)













    return (

        <Container>

            <LoginImage src={LoginImg} alt="logo-image" />

            <ContainerItens>

                <img src={Logo} alt="logo-code-burger" />
                <h1>Login</h1>

                <form noValidate onSubmit={handleSubmit(noSubmit)} >
                    <Label>Email!</Label>
                    <Input
                        type="email" {...register("email")}
                        error={errors.email?.message}
                    />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label>Senha!</Label>
                    <Input
                        type="password" {...register("password")}
                        error={errors.password?.message}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}> Sing In!</Button>
                </form>

                <SignInLink>

                    Não possui conta?{""}
                     <Link  style={{color: "white"}} to="/Cadastro"> Sign In </Link>


                </SignInLink>
            </ContainerItens>
        </Container>



    )

}
export default Login