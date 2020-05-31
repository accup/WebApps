const path = require('path');
const { spawn } = require('child_process');


const distDirName = 'dist';
const rootDirName = process.env.npm_package_config_rootDirName;
const deployBranchName = process.env.npm_package_config_deployBranchName;

command = 'push-dir';
args = [
  '--dir',
  path.join(
    distDirName,
    rootDirName
  ),
  '--branch',
  deployBranchName,
  '--cleanup'
];
options = {
  stdio: 'inherit',
  shell: true
};

console.log(`> ${command} ${args.map(arg => /\s/g.test(arg) ? arg.quote() : arg).join(' ')}`)
spawn(command, args, options);
