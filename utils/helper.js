import fs from 'fs';
import path from 'path';

const desktopDirectory = path.join(os.homedir(), 'Desktop');


export const create_directory = (folderName) =>{
    const folderPath = path.join(desktopDirectory, folderName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`Folder "${folderName}" created on the Desktop.`);
    } else {
        console.log(`Folder "${folderName}" already exists on the Desktop.`);
    }
}