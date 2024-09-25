import { Request } from "../../../../networking"
import { HttpStatusCode } from "axios";

export const getClassrooms = async () => {
    const response = await Request("GET", `/student/classrooms`);
    return response;
}

export const getOngoingTest = async () => {
    try {
        const response = await Request("GET", `/student/ongoingTest`);;
        if (response.status === 200) {
            return response;
        } else {
            return { data: { tests: [] } }; // Return a default response if status is not 200
        }
    } catch (err) {
        console.error('Error fetching ongoing tests:', err);
        return { data: { tests: [] } }; // Return a default response in case of error
    }
};

export const getUpcomingTests = async () => {
    try {
        const response = await Request("GET" , `/student/upcomingTest`);
        if(response.status === HttpStatusCode.Ok){
            return response;
        }
    }
    catch (err){
        throw new Error (err as any);
    }
}