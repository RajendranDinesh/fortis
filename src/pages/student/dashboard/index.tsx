//Dependencies

import React, { useState } from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from './dashboard.module.css';
import StudentBody from "./body";

//Assets

import { FaSpotify } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const StudentDashboard = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        setAnchorEl(null);
        window.location.reload();
    }

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.dashboard_header}>
                <div className={styles.dashboard_header_left}>
                    <div className={styles.logo_container}>
                        <FaSpotify />
                    </div>
                    <h1>Spotify</h1>
                </div>
                <div className={styles.dashboard_header_right}>
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
                                <Avatar sx={{
                                    width: "3.5vw", height: "6vh",
                                    marginRight: "1vw", fontSize: "1.5em", color: "#1c0523",
                                    background: "#d082ed"
                                }}>A</Avatar>
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
            <div className={styles.dashboard_body}>
                <h1>Welcome to the Student Dashboard</h1>

                <div className={styles.dashboard_body_content}>
                    <p>Here you can view your courses, grades, and other such information.</p>
                    <p>Good luck!</p>
                </div>

                <StudentBody />
            </div>
        </div>
    );
};

export default StudentDashboard;