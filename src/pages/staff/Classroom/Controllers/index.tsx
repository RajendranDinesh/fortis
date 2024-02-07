import { HttpStatusCode } from "axios";
import { Request } from "../../../../networking";

async function getClassroom(id: Number) {
    try {
        const response = await Request("GET", `/classroom/id/${id}`);

        if (response.status === HttpStatusCode.Ok) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

async function getClassroomStudents(id: Number) {
    try {
        const response = await Request("GET", `/classroom/${id}/students`);

        if (response.status === HttpStatusCode.Ok) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export { getClassroom, getClassroomStudents };