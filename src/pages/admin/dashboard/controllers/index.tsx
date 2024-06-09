import { HttpStatusCode } from "axios";
import { Request } from "../../../../networking";

import { staffDetails } from "../staffModal";

export async function addStaff(userDetails: staffDetails) {
    try {
        const response = await Request("POST", `/auth/register`, userDetails);

        if (response.status === HttpStatusCode.Created) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function addStudents(studentDetails: staffDetails) {
    const response = await Request("POST", `/auth/register`, studentDetails);

    if (response.status === HttpStatusCode.Created) {
        return response.data
    }
}