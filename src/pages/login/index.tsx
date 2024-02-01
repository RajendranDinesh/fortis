import { useState, useEffect } from "react";
import { Request, SetHeader } from "../../networking";
import { toast , Bounce, ToastContainer } from "react-toastify";

//Assest Imports
import styles from "./login.module.css"


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
        document.title = "Login Page"

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
            toast.success('Login Successfull!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });

            redirect({userRole});
    
        } catch (error: any) {
            setErrorMessage(error.response.data.message || 'Login failed');
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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                        onChange={(e) => setPassword(e.target.value)} 
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