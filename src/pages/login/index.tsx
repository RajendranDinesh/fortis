import { useState, useEffect } from "react";
import { Request, SetHeader } from "../../networking";

interface redirectParams {
    userRole: string
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const redirect = ({userRole}: redirectParams) => {
        switch (userRole) {
            case "admin":
                window.location.href = "/admin";
                break;

            case "teacher":
                window.location.href = "/staff";
                break;

            case "supervisor":
                window.location.href = "/supervisor";
                break;

            case "student":
                window.location.href = "/student";
                break

            default:
                break;
        }
    }

    useEffect(() => {
        const userRole = localStorage.getItem("userRole");

        if (userRole !== null){
            redirect({userRole});
        }
    });

    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            const response = await Request(
                "POST",
                "/auth/login",
                {email, password},
            );

            const { token, userRole } = response.data;

            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", userRole);

            SetHeader("Authorization ", `Bearer ${token}`);

            redirect({userRole});
        } catch (error: any) {
            setErrorMessage(error.response.data.message || 'Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;