const os = require('os');
const childProcess = require('child_process');
const fs = require('fs');

const commands = os.type() === 'Windows_NT' ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"` : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

setInterval(() => {
    const unixtime = Math.floor(Date.now() / 1000);
    if (unixtime % 60 === 0) {
        childProcess.exec(commands, (error, stdout, stderr) => {
            if (error !== null) {
                console.log(`error: ${error}`);
                return;
            }

            if (stderr?.trim().length) {
                console.log(`stderr: ${stderr} }} ${typeof stderr}`);
                return;
            }
            
            console.clear();
            console.log(`${unixtime} : ${stdout}`);

            fs.writeFile('activityMonitor.log', `${unixtime} : ${stdout}`, (error) => {
                if (error !== null) {
                    console.log(`error in writting: ${error}`);
                }
            })
        })
    }
}, 100)
