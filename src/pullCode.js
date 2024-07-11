import inquirer from 'inquirer';
import fs from 'fs';
import { Octokit } from '@octokit/rest';

// Load configuration from config.json
const configPath = './config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { GITHUB_TOKEN } = config;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function cloneFile(owner, repo, path) {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path
    });

    if (response.data.type === 'file') {
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      
      // Get filename
      const fileName = path.split('/').pop();
      const filePath = `./${fileName}`;
      
      // Save to the root directory
      fs.writeFileSync(filePath, content);

      console.log(`File ${fileName} has been pulled successfully.`);
    } else {
      console.log(`${path} is not a file.`);
    }
  } catch (error) {
    console.error('Error fetching file:', error);
  }
}

async function cloneFileInternal(owner, repo, path, basePath = '') {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path
    });

    if (response.data.type === 'file') {
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      const fileName = path.split('/').pop();
      const filePath = `./${basePath}/${fileName}`;
      
      // Write the file directly
      fs.writeFileSync(filePath, content);
    } else {
      console.log(`${path} is not a file.`);
    }
  } catch (error) {
    console.error('Error fetching file:', error);
  }
}

async function cloneFolderInternal(owner, repo, path, basePath = '') {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path
    });

    if (response.data.type !== 'file') {
      const items = response.data;

      // Create the base folder in local filesystem
      const folderName = path.split('/').pop();
      const folderPath = `./${basePath}/${folderName}`;
      fs.mkdirSync(folderPath, { recursive: true });

      for (const item of items) {
        if (item.type === 'file') {
          await cloneFileInternal(owner, repo, item.path, `${basePath}/${folderName}`);
        } else if (item.type === 'dir') {
          await cloneFolderInternal(owner, repo, item.path, `${basePath}/${folderName}`);
        }
      }
      
      console.log(`Folder ${path} has been pulled successfully to ${basePath}.`);
    } else {
      console.log(`${path} is not a folder.`);
    }
  } catch (error) {
    console.error('Error fetching folder:', error);
  }
}

async function cloneFolder(owner, repo, path, basePath = '') {
  const securityQuestion = await inquirer.prompt({
    name: 'answer',
    type: 'confirm',
    message: 'Are you sure that you want to pull this folder?',
    default: false
  });

  if (securityQuestion.answer) {
    await cloneFolderInternal(owner, repo, path, basePath);
  }
}

// Export functions
export { cloneFile, cloneFolder };
