import { HttpStatusCode } from "axios";
import { Request } from "../../../../networking";

import { staffDetails } from "../addStaffModal";

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