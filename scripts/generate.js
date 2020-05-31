const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const inquirer = require('inquirer');


const rootDirName = process.env.npm_package_config_rootDirName;
const appsDirName = process.env.npm_package_config_appsDirName;
const nuxtConfigFileName = 'nuxt.config.js';


fs.promises.readdir(appsDirName, { withFileTypes: true })
  .then(appsDirEntries => appsDirEntries
    .filter(entry => entry.isDirectory())
    .filter(entry => {
      try {
        fs.accessSync(
          path.join(
            appsDirName,
            entry.name,
            nuxtConfigFileName
          )
        );
        return true;
      } catch (_) {
        return false;
      }
    })
    .map(({ name }) => name)
  )
  .catch(err => Promise.reject(err.message))
  .then(appNames => {
    if (0 == appNames.length) {
      return Promise.reject("No application directory exists.");
    }
    return appNames;
  })
  .then(appsDirEntries => inquirer.prompt([
    {
      'name': 'appName',
      'type': 'list',
      'message': 'Which app do you develop?',
      choices: appsDirEntries,
      default: 0
    }])
    .then(answers => {
      spawn(
        'nuxt',
        [
          'generate',
          path.join(
            appsDirName,
            answers.appName
          )
        ],
        {
          stdio: 'inherit',
          shell: true
        }
      );
    })
    .catch(err => Promise.reject(err.message))
  )
  .catch(reason => {
    console.error(`Error: ${reason}`);
  });
