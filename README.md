# Kaixo
Kaixo is a command-line tool developed by TenBeltz for managing code reuse. It allows developers to search and clone code from a private GitHub repository, serving as an internal code library.

## Features

- **Search Code**: Quickly search for code within your private GitHub repository.
- **Clone Files**: Clone individual files from the repository.
- **Clone Folders**: Clone entire directories, maintaining the structure and contents.

## Installation
Ensure you have Node.js installed. Then, install the required packages:

```sh
npm install
```

## Usage
Run the following command to start the Kaixo CLI:

```sh
node index.js
```

## Options
- **Search Code**: Search for code in the repository.
- **Update Config**: Update the config.js data.
- **Exit**: Exit the CLI.

## Example
1. Start Kaixo:

```sh
node index.js
```
2. Select "Search Code" from the options.

3. Navigate through the files and folders in your repository.

4. Choose a file or folder to clone.

## Code Structure

### index.js
The entry point for the Kaixo CLI. It sets up the CLI options using Commander and handles user prompts with Inquirer. It initializes the search functionality.

### searchCode.js
Contains the logic for searching code within the GitHub repository. It uses the Octokit library to interact with the GitHub API and Inquirer for user prompts.

### pullCode.js
Handles the cloning of files and folders from the GitHub repository. It includes functions for cloning individual files and entire directories.

### updateConfig.js
Update the GitHub token, repository owner, and repository name used for accessing the code.

## Dependencies

- **commander**: For handling CLI options.
- **inquirer**: For user prompts.
- **gradient-string**: For colorful CLI output.
- **@octokit/rest**: For interacting with the GitHub API.

## License
MIT License

## Author
TenBeltz

## Contact
For any questions or support, please contact [TenBeltz.](https://github.com/TenBeltz)
