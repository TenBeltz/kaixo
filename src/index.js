import { Command } from 'commander';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import { readConfig, updateConfig } from './updateConfig.js';
import { searchCode } from './searchCode.js';

// Commander config
const program = new Command();

program
  .name('Kaixo')
  .description('Kaixo is a command-line tool by TenBeltz for managing code reuse. It allows developers to search and clone code from a private GitHub repository, serving as an internal code library.')
  .version('1.0.0');

program.parse(process.argv);

function main() {
  const config = readConfig();
  const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = config;

  const purple = '#922ABF';
  const pink = '#E2BBF2';
  const tenbeltzGradient = gradient(purple, pink);

  const header = "TenBeltz - Code Recycle\n";
  console.log(tenbeltzGradient(header));

  inquirer.prompt({
    name: 'Options',
    type: 'list',
    prefix: tenbeltzGradient('~'),
    message: tenbeltzGradient('What do you want to do?'),
    choices: [
      'Search Code',
      'Update Config',
      'Exit'
    ]
  })
  .then(answer => {
    switch (answer.Options) {
      case 'Search Code':
        console.log('Searching code...\n');
        searchCode(REPO_OWNER, REPO_NAME);
        break;
      case 'Update config':
        updateConfig()
          .then(updatedConfig => {
            console.log('Updated configuration:', updatedConfig);
          })
          .catch(error => {
            console.error('Error updating configuration:', error);
          })
          .finally(() => {
            main();
          });
        break;
      default:
        console.log('Exiting...');
        process.exit();
    }
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
}

main();
