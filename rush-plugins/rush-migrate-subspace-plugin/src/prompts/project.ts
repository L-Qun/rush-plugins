import inquirer from 'inquirer';
import { IRushConfigurationProjectJson } from '@rushstack/rush-sdk/lib/api/RushConfigurationProject';
import { basename } from 'path';
import Console from '../providers/console';

export const moveProjectPrompt = async (): Promise<boolean> => {
  const { moveProject } = await inquirer.prompt([
    {
      message: `Do you want to move this project's location?`,
      type: 'confirm',
      name: 'moveProject'
    }
  ]);

  return moveProject;
};

export const enterNewProjectLocationPrompt = async (
  sourceProjectFolderPath: string,
  targetSubspaceFolderPath: string
): Promise<string> => {
  const defaultProjectName: string = basename(sourceProjectFolderPath);
  const { projectFolderName } = await inquirer.prompt([
    {
      message: `Please enter the folder (or subfolder) you want to move this project to. ${Console.newLine()}${targetSubspaceFolderPath}/<your_project_folder>`,
      type: 'input',
      name: 'projectFolderName',
      default: defaultProjectName
    }
  ]);

  return `${targetSubspaceFolderPath}/${projectFolderName}`;
};

export const chooseProjectPrompt = async (
  projects: IRushConfigurationProjectJson[]
): Promise<IRushConfigurationProjectJson> => {
  const { projectName } = await inquirer.prompt([
    {
      message: `Please select the project name (Type to filter).`,
      type: 'search-list',
      name: 'projectName',
      choices: projects.map(({ packageName }) => ({ name: packageName, value: packageName }))
    }
  ]);

  return projects.find(({ packageName }) => packageName === projectName) as IRushConfigurationProjectJson;
};

export const confirmNextProjectPrompt = async (subspaceName: string): Promise<boolean> => {
  const { confirmNext } = await inquirer.prompt([
    {
      message: `Do you want to add another project to the ${subspaceName} subspace?`,
      type: 'confirm',
      name: 'confirmNext',
      default: true
    }
  ]);

  return confirmNext;
};