//dependencies

import React, { useState } from "react";

//styles

import styles from  './profilePage.module.css'

//assets

import { MdAddAPhoto, MdNavigateNext } from "react-icons/md";

//components

function Profiles() {

    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    };

    const triggerFileUpload = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };


    return (
        <div className={styles.profile_container_whole}>
            <div className={styles.profile_header}>
                <h1>Profile</h1>
            </div>
            <div className={styles.profile_top_container}>
                <div className={styles.profile_top_primary_container}>
                    <div className={styles.profile_top_primary_container_left}>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Name: </h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Email: </h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Phone: </h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Institution: </h1>
                        </div>
                    </div>
                    <div className={styles.profile_top_primary_container_right}>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Thomas Shelby</h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>thomas@shelbylmt.com</h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>+27 987654321</h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Shelby Limited</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.profile_top_pic_container}>
                    <div className={styles.profile_img_container} onClick={triggerFileUpload}>
                        <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
                        <MdAddAPhoto className={image ? styles.icon : styles.add_pic} />
                        {image && <img src={image} alt="Profile" className={styles.image} />}
                    </div>
                </div>
            </div>
            <div className={styles.profile_second_container}>
                <div className={styles.profile_second_top_container}>
                    <div className={styles.profile_second_top_container_left}>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Department: </h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Special Lab: </h1>
                        </div>
                    </div>
                    <div className={styles.profile_second_top_container_right}>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Mafia</h1>
                        </div>
                        <div className={styles.profile_top_primary_details_container}>
                            <h1>Bermingham</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.profile_second_bottom_container}>
                    <h1>Change Password</h1>
                    <MdNavigateNext className={styles.profile_second_bottom_container_icon} />
                </div>
            </div>
        </div>
    )
}

export default Profiles