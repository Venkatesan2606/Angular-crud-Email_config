import express from "express"
import multer from "multer"
import { createUser, deleteUser, getUser, sendEmail, UpdateUser, UserIndex } from "../controllers/userControllers.js"
const upload = multer({ dest: 'uploads/' }); 
const router = express.Router()

router.get("/",UserIndex)
router.get("/getUser",getUser)
router.post("/createUser",createUser)
router.put("/updateUser/:id",UpdateUser)
router.delete("/deleteUser/:id",deleteUser)
router.post('/sendEmail', upload.any(), sendEmail);

export default router;