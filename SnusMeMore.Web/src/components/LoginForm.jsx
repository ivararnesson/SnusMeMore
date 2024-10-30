import React, { useState, useContext } from "react"
import "../assets/CSS/loginForm.css"
import { AuthContext } from "../AuthContext"
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        login(email, password, resultHandler)
    }

    const resultHandler = (success) => {
        if (success) {
            navigate("/")
        } else {
            alert("Inloggning misslyckades")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="title">Logga in</h2>
            <div className="inputGroup">
                <label className="label">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <div className="inputGroup">
                <label className="label">Lösenord</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <button type="submit" className="button">Logga in</button>
        </form>
    )
}

const SignUpForm = ({ setIsLogin }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        signup(username, email, password, resultHandler)
    }

    const resultHandler = () => {
        setIsLogin(true)
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="title">Registrera dig</h2>
            <div className="inputGroup">
                <label className="label">Användarnamn</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <div className="inputGroup">
                <label className="label">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <div className="inputGroup">
                <label className="label">Lösenord</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <button type="submit" className="button">Registrera</button>
        </form>
    )
}

const AuthToggle = () => {
    const [isLogin, setIsLogin] = useState(true)
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <div>
            {
                isLoggedIn ? 
                (
                    <p>Du är inloggad</p>
                ) : (
                    <div className="container">
                    <div className="toggle">
                        <button
                            className={`toggleButton ${isLogin ? "active" : ""}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`toggleButton ${!isLogin ? "active" : ""}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>
                    {isLogin ? <LoginForm /> : <SignUpForm setIsLogin={setIsLogin} />}
                </div>
                )
            }
        </div>  
    )
}

export default AuthToggle