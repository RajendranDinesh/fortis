import { HttpStatusCode } from "axios";
import { Request } from "../../../../networking";

export async function getClassroom(id: Number) {
    try {
        const response = await Request("GET", `/classroom/id/${id}`);

        if (response.status === HttpStatusCode.Ok) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function getClassroomStudents(id: Number) {
    try {
        const response = await Request("GET", `/classroom/${id}/students`);

        if (response.status === HttpStatusCode.Ok) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function getClassroomTeachers(id: Number) {
    try {
        const response = await Request("GET", `/classroom/${id}/staffs`);

        if (response.status === HttpStatusCode.Ok) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function getClassroomTests(classRoomId: Number) {
    try {
        const response = await Request("GET", `/test/${classRoomId}/tests`);

        if (response.status === HttpStatusCode.Ok) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function addStudents(id: Number, students: Array<{user_name: string, roll_number: string, email: string}>) {
    try {
        const response = await Request("POST", `/classroom/${id}/students`, {students: students});

        if (response.status === HttpStatusCode.Created) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function addStaff(id: Number, staffs: Array<{user_name: string, faculty_id: string, email: string}>) {
    try {
        const response = await Request("POST", `/classroom/${id}/staff`, {email: staffs[0].email});

        if (response.status === HttpStatusCode.Created) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function getAvailableTests() {
    try {
        const response = await Request("GET", `/test/user/created-by-me`);

        if (response.status === HttpStatusCode.Ok) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function scheduleTest(classId: Number, test_id: string, date: string) {
    try {
        const response = await Request("POST", `/test/schedule`, {
            classroom_id: classId,
            test_id: test_id,
            scheduled_at: date
        });

        if (response.status === HttpStatusCode.Created) {
            return response.data
        }

    } catch (error) {
        throw new Error (error as any);
    }
}

export async function cancelScheduledTest(classroomId: Number, scheduleId: Number) {
    try {
        const response = await Request("DELETE", `/test/schedule/${classroomId}/${scheduleId}`);
        return response.data

    } catch (error) {
        throw new Error (error as any);
    }
}
