import { useState, useEffect } from "react";
import { Request, SetHeader } from "../../networking";
import { toast, ToastContainer } from "react-toastify";

//Assest Imports
import styles from "./login.module.css"

interface redirectParams {
    userRole: string
}

interface userRoles {
    roles: string[]
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRoles, setUserRoles] = useState<userRoles>({roles: []});
    const [showLoginButton, setShowLoginButton] = useState(true);

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

            const { token, userRoles } = response.data;

            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", userRoles);

            SetHeader("Authorization ", `Bearer ${token}`);

            if (userRoles?.length === 1) {
                const userRole = userRoles[0];
                redirect({userRole});
            }
            else {
                setUserRoles({roles: userRoles});
                setShowLoginButton(false);
            }
    
        } catch (error: any) {
            console.log(`[Login] ${error.message}`);
        }

    };

    return (
        <>
        <div className={styles.main_container}>
            <form action="" method="post" className={styles.form} onSubmit={handleLogin}>
            <div className={styles.heading_container}>
                <div className={styles.heading}>Consus</div>
                <div className={styles.sub_heading}>Login to your account</div>
            </div>
            <div className={styles.input_area}>

                <div className={styles.form_inp}>
                    <input 
                        type="email" 
                        value={email} 
                        placeholder="Email Address"
                        autoComplete="off"
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
                
                {showLoginButton && 
                    <div className={styles.submit_button_cvr}>
                        <button className={styles.submit_button} type="submit">Login</button>
                    </div>
                }
                {userRoles.roles.length > 1 && 
                <div className={styles.role_container}>
                    <h1 className={styles.role_Heading}>Select Role :</h1>
                    <div className={styles.role_button_cotainer}>
                        {userRoles.roles.map((userRole: string, index: number) =>
                            <button 
                                className={styles.role_button} 
                                key={index} 
                                onClick={() => {
                                    redirect({userRole});     
                                }}
                            >
                                {capitalizeFirstLetter(userRole)}
                            </button>
                        )}
                    </div>
                </div>
            }
               
            </form>
        </div>
        <ToastContainer/>
        </>
    );
};

export default Login;