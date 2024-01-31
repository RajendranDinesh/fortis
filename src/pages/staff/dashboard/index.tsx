//Dependencies

import React from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from "../../components/Modal";
import TextField from '@mui/material/TextField';

//Styles

import styles from "./StaffDashboard.module.css";

//Components

//Assets

import { FaSpotify } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function StaffDashboard () {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [modelOpen, setModelOpen] = React.useState(false)
    const [classroomName, setClassroomName] = React.useState("");
    const [classroomDescription, setClassroomDescription] = React.useState("");

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

    const handleClassroomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassroomName(event.target.value);
    };

    const handleClassroomDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassroomDescription(event.target.value);
    };

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
                        <MenuItem onClick={handleClose}>
                        Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className={styles.DashBoard_body}>
                <div className={styles.Add_classroom} onClick={handleModalClick}>
                    <IoIosAddCircle />
                </div> 
                <div className={styles.Classroom_display}>
                    <div className={styles.Classroom_display_header}>
                        <h1>Classroom Title</h1>
                    </div>
                    <div className={styles.Classroom_display_footer}>
                        <MdDeleteOutline id={styles.bin} />
                    </div>
                </div>  
            </div>
            <Modal isOpen={modelOpen} onClose={handleModalClick} title="Add Classroom">
                <div className={styles.Modal_content}>
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '40ch' },
                    }}
                    autoComplete="off"
                    >
                        <TextField
                            required
                            id={styles.text_field}
                            label="Classroom Name"
                            variant="standard"
                            onChange={handleClassroomNameChange}
                        />
                        <TextField 
                            id={styles.text_field} 
                            label="Description (optional)" 
                            variant="standard"
                            onChange={handleClassroomDescriptionChange} 
                        />
                    </Box>
                    <div className={styles.Modal_buttons}>
                        <button className={styles.save_button}>
                            <span>Add</span>
                        </button>
                        <button className={styles.cancel_button} onClick={handleModalClick}>
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StaffDashboard;