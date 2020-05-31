const path = require('path');
const { spawn } = require('child_process');


const distDirName = 'dist';
const rootDirName = process.env.npm_package_config_rootDirName;
const deployBranchName = process.env.npm_package_config_deployBranchName;


spawn(
  'push-dir',
  [
    '--dir',
    path.join(
      distDirName,
      rootDirName
    ),
    '--branch',
    deployBranchName,
    '--cleanup'
  ],
  {
    stdio: 'inherit',
    shell: true
  }
);
