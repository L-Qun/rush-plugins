import { FileSystem } from '@rushstack/node-core-library';
import { createSubspace } from './createSubspace';
import Console from '../providers/console';
import { RushConstants } from '@rushstack/rush-sdk';
import { getRushSubspacesConfigurationJsonPath } from '../utilities/repository';
import { getRushSubspaceConfigurationFolderPath } from '../utilities/subspace';
import { Colorize } from '@rushstack/terminal';
import { getRootPath } from '../utilities/path';

export const initSubspaces = async (): Promise<void> => {
  Console.debug(`Starting subspaces feature on ${Colorize.bold(getRootPath())}...`);

  const subspacesConfigurationJsonPath: string = getRushSubspacesConfigurationJsonPath();
  if (!FileSystem.exists(subspacesConfigurationJsonPath)) {
    FileSystem.copyFile({
      sourcePath: FileSystem.getRealPath(`${__dirname}/../templates/subspaces.json`),
      destinationPath: subspacesConfigurationJsonPath
    });

    Console.success(`${Colorize.bold(subspacesConfigurationJsonPath)} file created successfully!`);
  }

  if (!FileSystem.exists(getRushSubspaceConfigurationFolderPath(RushConstants.defaultSubspaceName))) {
    await createSubspace(RushConstants.defaultSubspaceName);
  }
};
