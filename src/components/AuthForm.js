import React, { useState } from 'react';
import { authService } from '../fbase';

const AuthForm = () => {
    const [email, setEmail] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState(null)

    const onChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        } else if (e.target.name === "displayName") {
            setDisplayName(e.target.value)
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(email, password)
                await authService.currentUser.updateProfile({ displayName })
            } else {
                await authService.signInWithEmailAndPassword(email, password)
            }
        } catch (err) {
            setError(err.message)
        }
    }
    const toggleAccount = () => setNewAccount(prev => !prev)
    return (<>
        <form onSubmit={onSubmit} className="container">
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
                className="authInput"
            />
            {newAccount && <input
                type="text"
                name="displayName"
                placeholder="What's your name?"
                required
                value={displayName}
                onChange={onChange}
                className="authInput"
            />}
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
                className="authInput"
            />
            <input className="authInput authSubmit" type="submit" value={newAccount ? "개정 만들기" : "로그인"} />
            {error ? <div className="authError">{error}</div> : null}
        </form>
        <span onClick={toggleAccount} className="authSwitch">
            {newAccount ? "기존 계정으로 로그인" : "새로운 개정 생성하기"}
        </span>
    </>
    );
}

export default AuthForm;