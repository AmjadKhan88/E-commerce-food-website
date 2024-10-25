import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
// store food
foodRouter.post("/add",upload.single("image"),addFood)
// get food list
foodRouter.get("/list",listFood)
// remove food item
foodRouter.post("/remove",removeFood)

export default foodRouter;