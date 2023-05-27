import React from 'react'
import { Navigate } from 'react-router-dom'
import UserContextProvider from '../context/UserContext';

interface PrivateRouteProps
{
    children: React.ReactNode
}

function PrivateRoute(props: PrivateRouteProps) {

    // TODO: Quand j'enlève les volumes des containers et que je redémarre l'app
    // eh bah j'ai toujours un token mais il est plus valide, du coup ça me renvoit sur la page de login puis sur la page du dashboard puis sur la page du login en boucle..
    // Vérifier comment faire
    if (!localStorage.getItem('access_token'))
        return <Navigate to={'/login'} />

  return (
    <UserContextProvider>
        {props.children}
    </UserContextProvider>);
}

export default PrivateRoute