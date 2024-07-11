import fs from 'fs';
import inquirer from 'inquirer';

// Load configuration from config.json
const configPath = './config.json';

export function readConfig() {
  const config = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(config);
}

export function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export async function updateConfig() {
  const config = readConfig();

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
    const updatedConfig = { ...config, ...answers };
    saveConfig(updatedConfig);
    console.log('Configuration updated successfully!\n');
    return updatedConfig;
  } catch (error) {
    console.error('Error updating configuration:', error);
    throw error;
  }
}
