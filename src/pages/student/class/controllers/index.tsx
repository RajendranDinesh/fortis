import { Request } from "../../../../networking"

export const getClassroomTitle = async (id: number) => {
    const response = await Request("GET", `/student/classroomTitle/${id}`);
    return response;
}

export const getStaffDetails = async (id: number) => {
    const response = await Request("GET", `/student/staffDetails/${id}`);
    return response;
}

export const getClassroomTests = async (id: number) => {
    const response = await Request("GET", `/student/classroomTests/${id}`);
    return response;
}