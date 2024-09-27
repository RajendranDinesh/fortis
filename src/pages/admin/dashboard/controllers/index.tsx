import { HttpStatusCode } from "axios";
import { Request } from "../../../../networking";

import { staffDetails } from "../staffModal";

export async function getDashboardData() {
    try {
        const response = await Request("GET", `/admin/dashboard`);

        if (response.status === HttpStatusCode.Ok)  return response.data;
    } catch (error) {
        throw error;
    }
}

// Staffs Starts

export async function getStaffs() {
    try {
        const response = await Request("GET", `/staff/all`);

        if (response.status === HttpStatusCode.Ok)  return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getBlockedStaffs() {
    try {
        const response = await Request("GET", `/staff/blocked`);

        if (response.status === HttpStatusCode.Ok)  return response.data;
    } catch (error) {
        throw error;
    }
}

export async function unBlockStaff(blockId: number) {
    try {
        await Request("PUT", `/staff/unblock/${blockId}`);
    } catch (error) {
        throw error;
    }
}

export async function blockStaff(facultyId: string, reason: string) {
    try {
        await Request("POST", `/staff/block/${facultyId}`, {reason: reason});
    } catch (error) {
        throw error;
    }
}

export async function addStaff(userDetails: staffDetails) {
    try {
        const response = await Request("POST", `/auth/register`, userDetails);

        if (response.status === HttpStatusCode.Created) {
            return response.data
        }

    } catch (error) {
        throw error;
    }
}

// Staffs Ends

// Student Starts

export async function addStudents(studentDetails: staffDetails) {
    try{
        const response = await Request("POST", `/auth/register`, studentDetails);

        if (response.status === HttpStatusCode.Created) {
            return response.data
        }

    } catch (error) {
        throw error;
    }
}

export async function blockStudent(rollNumber: string, reason: string) {
    await Request("POST", `/admin/block/student/${rollNumber}`,
        {
            reason: reason
        });
}

export async function getBlockedStudents() {
    try {
        const response = await Request("GET", `/admin/blocked/student`);

        if (response.status === HttpStatusCode.Ok)  return response.data;
    } catch (error) {
        throw error;
    }
}

export async function unBlockStudents(blockId: number) {
    try {
        await Request("PUT", `/admin/unblock/student/${blockId}`);
    } catch (error) {
        throw error;
    }
}

// Student Ends