import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import inquirer from 'inquirer';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = `${__dirname}/config.js`;

export async function updateConfig() {
  const questions = [
    {
      type: 'input',
      name: 'GITHUB_TOKEN',
      message: 'Enter your GitHub token:',
      default: config.GITHUB_TOKEN,
    },
    {
      type: 'input',
      name: 'REPO_OWNER',
      message: 'Enter your repository owner:',
      default: config.REPO_OWNER,
    },
    {
      type: 'input',
      name: 'REPO_NAME',
      message: 'Enter your repository name:',
      default: config.REPO_NAME,
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);

    config.GITHUB_TOKEN = answers.GITHUB_TOKEN;
    config.REPO_OWNER = answers.REPO_OWNER;
    config.REPO_NAME = answers.REPO_NAME;

    const configContent = `const config = ${JSON.stringify(config, null, 2)};\n\nexport default config;\n`;

    fs.writeFileSync(configPath, configContent);

    console.log('Configuration updated and saved successfully!\n');
    console.log('Updated configuration:', config);
    return config;
  } catch (error) {
    console.error('Error updating configuration:', error);
    throw error;
  }
}
