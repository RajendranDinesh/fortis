import React from "react";

import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { CiCircleChevRight } from "react-icons/ci";
import { Avatar } from "@mui/material";

import styles from './dashboard.module.css';
import handWave from '../../../assets/hand_wave.svg';

function AdminDashboard() {

    return (
        <div className={styles.dashboard}>

            <div className={styles.left_container}>
                <div className={styles.title_container}>
                    <h2>Metrics</h2>
                </div>
                <div className={styles.cards_container}>
                    {/* Teachers */}
                    <div className={styles.card}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Teachers</h3>
                                <p className={styles.count}>Count: 5</p>
                                <CiCircleChevRight className={styles.right_angle_bracket} />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.row}>
                                    <div className={styles.search}>
                                        <CiSearch fontSize={"24px"} strokeWidth={"1px"} />
                                        <input className={styles.input} type="text" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.list_container}>
                            <hr className={styles.divider}/>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    <p>Teacher 1</p>
                                </div>
                                <div className={styles.item}>
                                    <p>Teacher 2</p>
                                </div>
                            </div>
                            <div className={styles.bottom_row}>
                                <button className={styles.add_button}><FiPlus fontSize={"24px"} strokeWidth={"2px"} color={"#1db954"} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Students */}
                    <div className={styles.card}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Students</h3>
                                <p className={styles.count}>Count: 5</p>
                            </div>
                            <div className={styles.details}>
                                <div className={styles.row}>
                                    <div className={styles.search}>
                                        <CiSearch fontSize={"24px"} strokeWidth={"1px"} />
                                        <input className={styles.input} type="text" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.list_container}>
                            <hr className={styles.divider}/>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    <p>Student 1</p>
                                </div>
                                <div className={styles.item}>
                                    <p>Student 2</p>
                                </div>
                            </div>
                            <div className={styles.bottom_row}>
                                <button className={styles.add_button}><FiPlus fontSize={"24px"} strokeWidth={"2px"} color={"#1db954"} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Classes */}
                    <div className={styles.card}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Classes</h3>
                                <p className={styles.count}>Count: 5</p>
                            </div>
                            <div className={styles.details}>
                                <div className={styles.row}>
                                    <div className={styles.search}>
                                        <CiSearch fontSize={"24px"} strokeWidth={"1px"} />
                                        <input className={styles.input} type="text" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.list_container}>
                            <hr className={styles.divider}/>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    <p>AIML</p>
                                </div>
                                <div className={styles.item}>
                                    <p>IT</p>
                                </div>
                            </div>
                            <div className={styles.bottom_row}>
                                <button className={styles.add_button}><FiPlus fontSize={"24px"} strokeWidth={"2px"} color={"#1db954"} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Tests */}
                    <div className={styles.card}>
                        <div className={styles.top_row}>
                            <div className={styles.info}>
                                <h3 className={styles.heading}>Tests</h3>
                                <p className={styles.count}>Count: 5</p>
                            </div>
                            <div className={styles.details}>
                                <div className={styles.row}>
                                    <div className={styles.search}>
                                        <CiSearch fontSize={"24px"} strokeWidth={"1px"} />
                                        <input className={styles.input} type="text" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.list_container}>
                            <hr className={styles.divider}/>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    <p>Test 1</p>
                                </div>
                                <div className={styles.item}>
                                    <p>Test 2</p>
                                </div>
                            </div>
                            <div className={styles.bottom_row}>
                                <button className={styles.add_button}><FiPlus fontSize={"24px"} strokeWidth={"2px"} color={"#1db954"} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.right_container}>
                <div className={styles.title_container}>
                    <h2>Hi <img alt="hand wave" src={handWave} height={"30rem"} width={"30rem"} /> admin name</h2>
                    <Avatar alt="Admin" sx={{ width: 100, height: 100 }}><h1>A</h1></Avatar>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;