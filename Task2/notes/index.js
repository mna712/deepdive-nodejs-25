
const fs= require('fs');

// Read the file
 
//blocking code
// const filecontent = fs.readFileSync('./task.txt', 'utf8');
// console.log('file content: ',filecontent);


 // Non-blocking code
const filecontent =fs.readFile('./task.txt','utf-8' ,(err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
})


// Write to the file
const newContent = 'hello from node.js';

// fs.writeFile('./users.json', JSON.stringify([{id:2 ,"name":"menna"}]) , (err) => {
//     if (err) {
//         console.error('Error writing to file:', err);
//         return;
//     }
//     console.log('File written successfully');
// });


//delete a file

// fs.unlink('./users.json', (err) => {
//     if (err) {
//         console.error('Error deleting file:', err);
//         return;
//     }
//     console.log('File deleted successfully');
// });



//streams [readable and writable]
const readableStream = fs.createReadStream('./task.txt', 'utf-8');  

const writableStream = fs.createWriteStream('./stream.txt', 'utf8' ); 

readableStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
    writableStream.write('\n chunk: ' + chunk); 

});

//npm => node package manager



