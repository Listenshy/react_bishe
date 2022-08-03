import request from "../request"

export const TeacherList = () => request.get("/teacher/list")