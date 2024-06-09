import { toast } from "react-toastify";

import { studentDetails } from "..";

interface Props {
    userDetails: studentDetails
    students: studentDetails[]
}

export function validateStudent({userDetails, students}: Props) {
    const emailRegex = /^[^\s@]+@bitsathy\.ac\.in$/;

    if ((userDetails.user_name === '' || userDetails.user_name === undefined) && (userDetails.roll_number === ''|| userDetails.roll_number === undefined) && (userDetails.email === ''|| userDetails.email === undefined)) return;

    if (userDetails.user_name === '' || userDetails.roll_number === '' || userDetails.email === '') {
        toast.error('Please fill all the fields', {
            autoClose: 2000,
            theme: "dark",
        });
        return;
    }

    if (!emailRegex.test(userDetails.email)) {
        toast.error('Enter a valid bitsathy id', {
            autoClose: 2000,
            theme: "dark",
        });
        return;
    }

    userDetails.user_name = userDetails.user_name.trim();
    userDetails.roll_number = userDetails.roll_number.trim().toUpperCase();
    userDetails.email = userDetails.email.trim();

    return true;
};
