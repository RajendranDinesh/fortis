import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import styles from './layout.module.css';

type LayoutProps = {
    children: React.ReactNode;
};

export default function StudentLayout({ children }: LayoutProps) {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        navigate("/logout");
    }

    return (
        <div className={styles.layout_container}>
            <header>
                <div className={styles.header_left}>
                    <img src="" className={styles.logo} alt="logo" onClick={() => {
                        window.location.href = `/student`;
                    }} />
                </div>
                <div className={styles.header_right}>
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
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "1.5em",
                                    color: "#1c0523",
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
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem
                            onClick={handleClose}
                            sx={{
                                width: "120px",
                            }}
                        >Profile</MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                width: "120px",
                            }}
                        >Logout</MenuItem>
                    </Menu>
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}