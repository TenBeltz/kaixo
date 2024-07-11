import fs from 'fs';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import { Octokit } from '@octokit/rest';
import { cloneFolder, cloneFile } from './pullCode.js';

// Load configuration from config.json
const configPath = './config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { GITHUB_TOKEN } = config;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const purple = '#922ABF';
const pink = '#E2BBF2';
const tenbeltzGradient = gradient(purple, pink);

async function searchCode(owner, repo, path = '') {
  try {
    const response = await octokit.repos.getContent({ owner, repo, path });

    const choices = response.data.map(item => ({
      name: item.name,
      value: item.path,
      short: item.type
    }));

    if (path) {
      choices.unshift({ name: '../', value: path.split('/').slice(0, -1).join('/'), short: 'dir' });
      choices.splice(1, 0, { name: 'Select Folder', value: path.split('/').join('/'), short: 'dir' }); // Insertar como segunda opción
    }    

    const chosenItem = await inquirer.prompt({
      name: 'codingArea',
      type: 'list',
      prefix: tenbeltzGradient('~'),
      message: tenbeltzGradient('Choose a file or folder'),
      choices,
    });

    const selectedPath = chosenItem.codingArea;

    if (selectedPath === path.split('/').slice(0, -1).join('/')) {
      await searchCode(owner, repo, selectedPath);
    } else if (selectedPath === path) {
      console.log('Current directory path:', path);
      await cloneFolder(owner, repo, path);
    } else {
      const selectedItem = response.data.find(item => item.path === selectedPath);

      if (selectedItem.type === 'dir') {
        await searchCode(owner, repo, selectedPath);
      } else {
        await cloneFile(owner, repo, selectedPath);
      }
    }
  } catch (error) {
    console.error('Error occurred while searching code:', error);
  }
}

export { searchCode };
