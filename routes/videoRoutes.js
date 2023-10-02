import { Router } from "express";
const router = Router();
import { start_recording,
    upload_chunk,
    stop_recording,
    watch
} from "../controller/videoController.js";


router.get('/start-recording', start_recording) 
router.post('/upload-chunk/:sessionId', upload_chunk) 
router.post('/stop_recording/:sessionId', stop_recording) 
router.get('/watch', watch) 


export default router; 
