import React from 'react'

import './Login.css'

import snapsinn from '../../assets/snapsinn.svg'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { auth, provider } from '../../firebase';
import { login } from '../../features/appSlice';

const Login = () => {
    const dispatch = useDispatch();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch(
                    login({
                        username: result.user.displayName,
                        profilePic: result.user.photoURL,
                        id: result.user.uid
                    })
                )
            })
            .catch((err) => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={snapsinn} alt='' />
                <Button onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
