//Dependencies

import React from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HttpStatusCode } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Request } from "../../../networking";
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from "react-router-dom";

//Styles

import styles from "./StaffDashboard.module.css";

//Components

import Body from "./body";

import AddClassroomModal from "./addClassroomModal";
import AddTestModal from "./addTestModal";

//Assets

import logo from "../../../assets/logo.svg";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { SiGoogleclassroom, SiTestcafe } from "react-icons/si";

export interface ClassRoom {
    classroom_id: number
    name: string
    description: string
    updated_at: Date
    created_at: Date
}

export interface TestType {
    test_id: number
    title: string
    description: string
    duration_in_minutes: number
}

function StaffDashboard () {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [modelOpen, setModelOpen] = React.useState(false);
    const [modelTestsOpen, setModelTestsOpen] = React.useState(false);
    const [classroomList, setClassroomList] = React.useState<ClassRoom[]>([]);
    const [testList, setTestList] = React.useState<TestType[]>([]);
    const [openSpeadDial, setOpenSpeedDial] = React.useState(false);
    const handleSpeedDialOpen = () => setOpenSpeedDial(true);
    const handleSpeedDialClose = () => setOpenSpeedDial(false);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate("/users");
    }

    const handleModalClick = () => {
        setModelOpen(!modelOpen);
    }

    const handleTestsModalClick = () => {
        setModelTestsOpen(!modelTestsOpen);
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
                setClassroomList(response.data.classrooms);
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

    const getTests = async () => {
        try {
            const response = await Request("GET", "/test/user/created-by-me");

            if (response.status === HttpStatusCode.Ok) {
                setTestList(response.data.tests);
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

    const actions = [
        { icon: <SiGoogleclassroom onClick={handleModalClick} style={{fontSize: '2em'}} />, name: 'Class' },
        { icon: <SiTestcafe onClick={handleTestsModalClick} style={{fontSize: '2em'}} />, name: 'Test' },
    ];

    return (
        <div className={styles.DashBoard_container}>
            <div className={styles.DashBoard_header}>
                <div className={styles.DashBoard_header_left}>
                    <div className={styles.Logo_container}>
                    <img src={logo} className={styles.logo} alt="logo" onClick={() => {
                        window.location.href = `/staff`;
                    }}/>
                    </div>
                    <h1>Consus</h1>
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
                            <div className={styles.account_center}>
                                <Avatar sx={{ width: "100%", height: "100%", color: "#1c0523", background: "#d082ed" }}>A</Avatar>
                            </div>
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
                        <MenuItem onClick={handleProfile}>
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
                <div className={styles.Add_classroom}>
                    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
                        <Backdrop open={openSpeadDial} />
                        <SpeedDial
                            ariaLabel="SpeedDial tooltip example"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                            onClose={handleSpeedDialClose}
                            onOpen={handleSpeedDialOpen}
                            open={openSpeadDial}
                        >
                            {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                tooltipOpen
                            />
                            ))}
                        </SpeedDial>
                    </Box>
                </div> 
                <Body classroomList={classroomList} getClassrooms={getClassrooms} testList={testList} getTests={getTests} />
            </div>
            <AddClassroomModal modelOpen={modelOpen} handleModalClick={handleModalClick} getClassrooms={getClassrooms}/>
            <AddTestModal modelTestsOpen={modelTestsOpen} handleTestsModalClick={handleTestsModalClick} getTests={getTests} />
            <ToastContainer />
        </div>
    );
};

export default StaffDashboard;
