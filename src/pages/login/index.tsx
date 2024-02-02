import { useState, useEffect } from "react";
import { Request, SetHeader } from "../../networking";
import { toast, ToastContainer } from "react-toastify";

//Assest Imports
import styles from "./login.module.css"

interface redirectParams {
    userRole: string
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = ({userRole}: redirectParams) => {
        switch (userRole) {
            case "admin":
                window.location.href = "/admin";
                break;

            case "staff":
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
        const authToken = localStorage.getItem("authToken");
        const userRole = localStorage.getItem("userRole");
        document.title = "Login Page"

        if (userRole !== null && authToken !== null){
            redirect({userRole});
        }
    });

    const handlePasswordChange = (e: any) => {
        if (e.target.key === "Enter") {
            handleLogin(e);
        } else {
            setPassword(e.target.value);
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            const response = await toast.promise(
                Request(
                "POST",
                "/auth/login",
                {email, password},
            ), {
                pending: "Logging in...",
                success: "Login Successfull!",
                error: "Something went wrong",
            });

            if (response.status !== 200) {
                throw new Error("Something went wrong");
            }

            const { token, userRole } = response.data;

            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", userRole);

            SetHeader("Authorization ", `Bearer ${token}`);

            redirect({userRole});
    
        } catch (error: any) {
            console.log(`[Login] ${error.message}`);
        }

    };

    return (
        <>
        <div className={styles.main_container}>
            <form action="" method="post" className={styles.form} onSubmit={handleLogin}>
            <div className={styles.heading_container}>
                <div className={styles.heading}>Spotify</div>
                <div className={styles.sub_heading}>Login to your account</div>
            </div>
            <div className={styles.input_area}>

                <div className={styles.form_inp}>
                    <input 
                        type="email" 
                        value={email} 
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className={styles.form_inp}>
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="Password"
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>
                </div>
                <div className={styles.submit_button_cvr}>
                    <button className={styles.submit_button} type="submit">Login</button>
                </div>

                <div className={styles.forgot_pass}>
                    <a href="/">Forgot password?</a>
                </div>
               
            </form>
        </div>
        <ToastContainer/>
        </>
    );
};

export default Login;