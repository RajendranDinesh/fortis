import { Request } from "../../../../networking"

export const getClassrooms = async () => {
    const response = await Request("GET", `/classroom/user/me`);
    return response;
}