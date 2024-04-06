import { Request } from "../../../../networking"

export const getClassrooms = async () => {
    const response = await Request("GET", `/student/classrooms`);
    return response;
}