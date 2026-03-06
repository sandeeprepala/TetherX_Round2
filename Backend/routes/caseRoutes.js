import express from "express"
import {createCase,getPendingCases,treatCase,getCaseById} from "../controllers/caseController.js"
import {auth} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/",auth,createCase)

router.get("/pending",auth,getPendingCases)

router.put("/treat/:id",auth,treatCase)

router.get("/:id",auth,getCaseById)

export default router