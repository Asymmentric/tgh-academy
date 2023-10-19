import { Application, Request, Response } from "express"
import { addNewStudent, authSignIn } from "./admin/user"
import { checkAuth } from "./middleware/checkAuth"
import { isAdmin } from "./middleware/isAdminCheck"
import { getAssignments } from "./student/getAssignments"
import { updateAssignmentStatus } from "./student/updateAssignmentStatus"
import { assignTasktoStudent } from "./admin/assignTask"

export function router(app: Application) {
    app.get('/', (req: Request, res: Response) => {
        res.send({ status: 'OK', msg: 'Working' })
    })

    //admin Interface

    app.post('/api/v1/auth/login', authSignIn)

    app.post('/api/v1/admin/add/student',checkAuth,isAdmin,addNewStudent)

    app.post('/api/v1/admin/add/task', checkAuth,isAdmin,assignTasktoStudent)

    app.get('/api/v1/task', checkAuth, getAssignments)

    app.post('/api/v1/task/status',checkAuth, updateAssignmentStatus)
    //student interface
}