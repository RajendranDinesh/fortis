import { useNavigate } from 'react-router-dom';


// Assests import
import styles from './supervisorDashboard.module.css'
import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import { Request } from '../../../networking';
import { ReactComponent as Consuslogo } from '../../../assets/logo.svg';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

interface Test {
    id: number;
    scheduled_at: string;
    test_id: number;
    title: string;
    total_students: number;
}

const SupervisorDashboard = () => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleCardClick = (testId: number) => {
        navigate(`/supervisor/StudentDetailsPage/${testId}`);
    }   
    
    const [tests, setTests] =useState<Test[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Request("GET",`/supervisor/dashboard-data`);
                if (response.status === 200) {
                    const testData = response.data.tests.map((test: Test) => ({
                        ...test,
                        scheduled_at: new Date(test.scheduled_at).toLocaleDateString(), // Format date
                    }));
                    setTests(testData);
                    console.log(testData);
                } else {
                    console.error('Failed to fetch test data');
                }
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        setAnchorEl(null);
        window.location.reload();
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.header_container}>
                <div className={styles.DashBoard_header_left}>
                <Consuslogo className={styles.header_image}/>
                <h2 className={styles.header_title}>Consus</h2>
                </div>
                
                <div className={styles.DashBoard_header_right}>
                    <div className={styles.BoxContainer}>
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
                            color: "#1c0523",
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
            </div>
            <div className={styles.body_container} >
                { tests.length === 0 ? (
                    <h2 className={styles.no_Test}>No Tests Found</h2>
                ) :(
                    tests.map((test, index) => (
                        <div className={styles.card_container} key={test.test_id ?? 0} onClick={() => handleCardClick(test.id ?? 0)}>
                            <div className={styles.card_pattern}></div>
                            <div className={styles.text_container}>
                                <div>
                                <div className={styles.card_nameContainer}>
                                    <h1 className={styles.card_name}>{test.title}</h1>
                                </div>
                                <div className={styles.card_dateContainer}>
                                    <FaCalendarCheck />
                                    <p className={styles.card_date}>{test.scheduled_at}</p>
                                </div>
                                </div>
                                <div className={styles.card_NumberContainer}>
                                    <MdOutlineSupervisorAccount className={styles.count_image} />
                                    <h1 className={styles.card_number}>{test.total_students}</h1>
                                </div>
                            </div>
                    </div>
                    ))
                )}
        </div>
        </div>
    );
};

export default SupervisorDashboard;