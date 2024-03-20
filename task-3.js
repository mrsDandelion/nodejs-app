import csv from 'csvtojson';
import * as fs from 'fs';

const readableStream = fs.createReadStream('./csv/data.csv');
const writableStream = fs.createWriteStream('data.json');

async function logChunks(readable) {
    for await (const chunk of readable) {
        writableStream.write(chunk);
    }
}
logChunks(readableStream.pipe(csv()));
