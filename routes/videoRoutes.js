import { Router } from "express";
const router = Router();
import {
    start_recording,
    upload_chunk
} from "../controller/videoController.js";


router.post('/start-recording', start_recording) 
router.post('/upload-chunk/:sessionId', upload_chunk) 


export default router; 
