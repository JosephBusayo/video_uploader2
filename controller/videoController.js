import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'


const videoSessions = new Map()
export const start_recording = (re, res) =>{
    const sessionId = uuidv4()
    videoSessions.set(sessionId, [])
    res.json({sessionId})
}

export const upload_chunk = (req, res) =>{
    const { sessionId } = req.params
    const new_video_chunk = req.body.chunk

    if (videoSessions.has(sessionId)){
        const current_session_chunks = videoSessions.get(sessionId)
        current_session_chunks.push(new_video_chunk)
        videoSessions.set(sessionId, current_session_chunks)
        res.status(200).send(
            {message : 'Chunk received and appended'}
        )
    }else {
        res.status(400).send('Invalid session ID.');
    }
}

/* export const stop_recording = (req, res) => {
    const { sessionId } = req.params

    if 
} */
