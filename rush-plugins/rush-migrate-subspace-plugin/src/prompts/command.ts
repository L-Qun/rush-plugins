import inquirer from 'inquirer';

export const chooseCommandPrompt = async (): Promise<string> => {
  const { command } = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'What would you like to do?',
      choices: [
        { name: 'Move a project to a new subspace', value: 'move' },
        { name: 'Fix all version mismatches for a subspace', value: 'sync' },
        { name: 'Identify all version mismatches for a project', value: 'analyze' },
        { name: 'Exit application', value: 'exit' }
      ]
    }
  ]);

  return command;
};
