import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'



const videoSessions = new Map()
export const start_recording = (req, res) => {
    const sessionId = uuidv4()
    videoSessions.set(sessionId, [])
    res.json({ sessionId })
}

export const upload_chunk = (req, res) => {
    const { sessionId } = req.params
    const new_video_chunk = req.body.chunk

    if (videoSessions.has(sessionId)) {
        const current_session_chunks = videoSessions.get(sessionId)
        current_session_chunks.push(new_video_chunk)
        videoSessions.set(sessionId, current_session_chunks)
        res.status(200).send(
            { message: 'Chunk received and appended' }
        )
    } else {
        res.status(400).send('Invalid session ID.');
    }
}

export const stop_recording = (req, res) => {
    const total_video_size = req.header('Content-Length');
    const { sessionId } = req.params
    const current_size = current_session_chunks.reduce((acc, chunk) => acc + chunk.length, 0);

    if (current_size >= total_video_size) {
        const complete_video = Buffer.concat(current_session_chunks);
    
        const video_name = `${sessionId}.webm`; 
        const video_folder = path.join(__dirname, 'uploads', video_name);
    
        fs.writeFileSync(video_folder, complete_video);
        res.redirect(`/watch?sessionId=${sessionId}`);
    }
}
export const watch = (req, res) => {
    const { sessionId } = req.query;
    const videoFilePath = path.join(__dirname, 'uploads', `${sessionId}.webm`);

    fs.readFile(videoFilePath, (err, data) => {
        if (err) {
            res.status(404).send('Video not found');
        } else {
            res.setHeader('Content-Type', 'video/webm');
            res.setHeader('Content-Length', data.length);
            res.end(data);
        }
    });
};
