import React, { createContext, useContext, useEffect, useState,  } from "react";

import PropTypes from "prop-types"

const UserContext = createContext({})


export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({})


    const putUserData = async userInfo => {
        setUserData(userInfo)


        await localStorage.setItem("codeburger:userdata", JSON.stringify(userInfo))



    }

    useEffect(() => {

        const loadUserData = async () => {

            const clientInfo = await localStorage.getItem("codeburger:userdata")
if (clientInfo) {
    setUserData(JSON.parse(clientInfo))

}
     
        }

loadUserData()

    }, [])





    return (
        <UserContext.Provider value={{ putUserData, userData }}>
            {children}
        </UserContext.Provider>

    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {

        throw new Error("useUser must be used with UserContext")

    }

    return context

}


UserProvider.prototypes = {
    children: PropTypes.node


}