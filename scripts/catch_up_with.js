const { createInterface } = require('readline');
const { spawn } = require('child_process');

const baseBranchName = (3 <= process.argv.length) ? process.argv[2] : 'master';

const gitBranch = spawn('git', ['branch', '--format=%(HEAD)%(refname:short)']);
const gitBranchStdout = createInterface(gitBranch.stdout);

let currentBranchName = null;
let branchNamesExceptBase = [];

function catchUpWithBaseBranch() {
    if (branchNamesExceptBase.length === 0) {
        const gitCheckOut = spawn('git', ['checkout', currentBranchName]);
        gitCheckOut.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Error: Failed to restore the checkout status. Please be careful with the current branch.`);
            }
        });
    } else {
        const branchName = branchNamesExceptBase.pop();
        const gitCheckout = spawn('git', ['checkout', branchName]);

        // exit イベントはプロセスの完了を意味
        gitCheckout.on('exit', (code) => {
            if (code === 0) {
                const gitMerge = spawn('git', ['merge', baseBranchName]);
                gitMerge.on('exit', (code) => {
                    if (code === 0) {
                        console.log(`${branchName} successfully catched up with ${baseBranchName}.`);
                    } else {
                        console.error(`Error: ${branchName} failed to catch up with ${baseBranchName}.`);
                    }
                    catchUpWithBaseBranch();
                });
            } else {
                console.error(`Error: ${branchName} failed to catch up with ${baseBranchName}.`);
                catchUpWithBaseBranch();
            }
        });
    }
}

gitBranchStdout.on('line', (line) => {
    const head = line[0];
    const name = line.substr(1);

    if (head === '*') {
        currentBranchName = name;
    }
    if (name !== baseBranchName) {
        branchNamesExceptBase.push(name);
    }
});
// close イベントは入出力の完了を意味
gitBranch.on('close', (code) => {
    if (code === 0) {
        console.log(`base = ${baseBranchName}`);
        console.log(`current = ${currentBranchName}`);

        catchUpWithBaseBranch();
    } else {
        console.error(`Error: Failed to detect git branches.`);
    }
});