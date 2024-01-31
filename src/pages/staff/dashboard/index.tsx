//Dependencies

import React from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HttpStatusCode } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Request } from "../../../networking";

//Styles

import styles from "./StaffDashboard.module.css";

//Components

import Body from "./body";

//Assets

import { IoIosAddCircle } from "react-icons/io";
import { FaSpotify } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddClassroomModal from "./addUserModal";

interface ClassRoom {
    classroom_id: number
    name: string
    description: string
    updated_at: Date
    created_at: Date
}

function StaffDashboard () {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [modelOpen, setModelOpen] = React.useState(false);
    const [classroomList, setClassroomList] = React.useState<ClassRoom[]>([]);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModalClick = () => {
        setModelOpen(!modelOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        setAnchorEl(null);
        window.location.reload();
    }

    const getClassrooms = async () => {
        try {
            const response = await Request("GET", "/classroom/user/me");

            if (response.status === HttpStatusCode.Ok) {
                setClassroomList(response.data);
            }

        } catch (error) {
            if ((error as any).response) {
                toast.error((error as any).response.data.message, {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
            } else {
                toast.error((error as Error).message, {
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: true,
                });
            }
        }
    }

    return (
        <div className={styles.DashBoard_container}>
            <div className={styles.DashBoard_header}>
                <div className={styles.DashBoard_header_left}>
                    <div className={styles.Logo_container}>
                        <FaSpotify />
                    </div>
                    <h1>Spotify</h1>
                </div>
                <div className={styles.DashBoard_header_right}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="medium"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: "3.5vw", height: "6vh", 
                            marginRight: "1vw", fontSize: "1.5em", color: "#1c0523",
                            background: "#d082ed" }}>A</Avatar>
                        </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                        Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                        My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                        Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className={styles.DashBoard_body}>
                <div className={styles.Add_classroom} onClick={handleModalClick}>
                    <IoIosAddCircle />
                </div> 
                <Body classroomList={classroomList} getClassrooms={getClassrooms} />
            </div>
            <AddClassroomModal modelOpen={modelOpen} handleModalClick={handleModalClick} getClassrooms={getClassrooms}/>
            <ToastContainer />
        </div>
    );
};

export default StaffDashboard;