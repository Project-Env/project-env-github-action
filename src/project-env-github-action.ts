import * as core from '@actions/core'
import {https} from 'follow-redirects'
import * as path from 'path'
import * as tar from 'tar'
import * as child_process from 'child_process'
import adm_zip from 'adm-zip'
import * as fs from "fs";
import * as os from "os";

interface ToolInfo {
    environmentVariables: { [key: string]: string };
    pathElements: string[];
}

type AllToolInfos = { [key: string]: ToolInfo[] };

export default class ProjectEnvGithubAction {

    async run() {
        const configFile = core.getInput('config-file') || 'project-env.toml';
        const cliVersion = core.getInput('cli-version', {required: true});
        const cliDebug = core.getInput('cli-debug') === 'true'

        const tempDir = this.createTempDir('project-env');

        try {
            const archive = await this.downloadProjectEnvCliArchive(cliVersion, tempDir);
            this.extractProjectEnvCliArchive(archive, tempDir);

            const executable = this.resolveProjectEnvCliExecutable(tempDir);

            const allToolInfos = await this.executeProjectEnvCli(executable, configFile, cliDebug);
            core.debug(`resulting tool infos: ${JSON.stringify(allToolInfos)}`);

            this.processToolInfos(allToolInfos);
        } catch (error: any) {
            core.setFailed(this.getErrorMessage(error));
        } finally {
            this.cleanTempDir(tempDir);
        }
    }

    private createTempDir(name: string) {
        return fs.mkdtempSync(path.join(os.tmpdir(), `${name}-`));
    }

    private cleanTempDir(tempDir: string) {
        try {
            fs.rmdirSync(tempDir, {recursive: true})
        } catch (error: any) {
            core.debug(`failed to delete temporary directory ${tempDir}: ${error}`)
        }
    }

    private async downloadProjectEnvCliArchive(cliVersion: string, targetDirectory: string) {
        const archiveBaseUrl = this.createProjectEnvCliArchiveBaseUrl(cliVersion);
        const archiveFilename = this.createProjectEnvCliArchiveFilename(cliVersion);
        const archiveUrl = `${archiveBaseUrl}/${archiveFilename}`;

        const targetFile = path.join(targetDirectory, archiveFilename);

        core.debug(`downloading Project-Env CLI from ${archiveUrl} to ${targetFile}`);
        await this.downloadArchive(archiveUrl, targetFile);

        return targetFile;
    }

    private createProjectEnvCliArchiveBaseUrl(cliVersion: string) {
        return `https://github.com/Project-Env/project-env-cli/releases/download/v${cliVersion}`;
    }

    private createProjectEnvCliArchiveFilename(cliVersion: string) {
        const osName = this.getOsName();
        const fileExt = this.getFileExtension();

        return `cli-${cliVersion}-${osName}-amd64.${fileExt}`;
    }

    private getOsName() {
        switch (os.platform()) {
            case 'darwin':
                return 'macos'
            case 'linux':
                return 'linux'
            case 'win32':
                return 'windows'
            default:
                throw new Error(`unsupported OS ${os.platform()}`)
        }
    }

    private getFileExtension() {
        switch (os.platform()) {
            case 'darwin':
            case 'linux':
                return 'tar.gz'
            case 'win32':
                return 'zip'
            default:
                throw new Error(`unsupported OS ${os.platform()}`)
        }
    }

    private async downloadArchive(url: string, targetFile: string) {
        const writeStream = fs.createWriteStream(targetFile);

        return new Promise<void>((resolve, reject) => {
            core.debug(`downloading ${url} to ${targetFile}`);

            https.get(url, response => {
                if (response.statusCode !== 200) {
                    reject(`failed to download Project-Env CLI from URL ${url} (404)`);
                }

                const stream = response.pipe(writeStream);
                stream.on('finish', () => resolve());
            }).on('error', e => {
                reject(e.message);
            })
        })
    }

    private extractProjectEnvCliArchive(archiveFile: string, targetDirectory: string) {
        if (archiveFile.endsWith('zip')) {
            this.extractZipArchive(archiveFile, targetDirectory);
        } else {
            this.extractTarGzArchive(archiveFile, targetDirectory);
        }
    }

    private extractZipArchive(archiveFile: string, targetDirectory: string) {
        new adm_zip(archiveFile).extractAllTo(targetDirectory);
    }

    private extractTarGzArchive(archiveFile: string, targetDirectory: string) {
        tar.x({file: archiveFile, C: targetDirectory, sync: true});
    }

    private resolveProjectEnvCliExecutable(sourceDirectory: string) {
        const executableFilename = `project-env-cli${this.getExecutableExtension()}`;
        const executable = path.join(sourceDirectory, executableFilename);
        if (!fs.existsSync(executable)) {
            throw new Error(`could not find Project-Env CLI at ${executable}`);
        }

        return executable;
    }

    private getExecutableExtension() {
        return os.platform() === 'win32' ? '.exe' : '';
    }

    private processToolInfos(allToolInfos: AllToolInfos) {
        for (const toolName of Object.keys(allToolInfos)) {
            const toolInfos = allToolInfos[toolName] || [];
            for (const toolInfo of toolInfos) {
                const pathElements = toolInfo.pathElements || [];
                for (const pathElement of pathElements) {
                    core.debug(`adding ${pathElement} to path`);
                    core.addPath(pathElement);
                }

                const environmentVariables = toolInfo.environmentVariables || {};
                for (const environmentVariableName of Object.keys(environmentVariables)) {
                    const environmentVariableValue = environmentVariables[environmentVariableName];

                    core.debug(`exporting variable ${environmentVariableName} with value ${environmentVariableValue}`);
                    core.exportVariable(environmentVariableName, environmentVariableValue);
                }
            }
        }
    }

    private async executeProjectEnvCli(executable: string, configFile: string, debug: boolean) {
        return new Promise<AllToolInfos>((resolve, reject) => {
            let args = ['--config-file', configFile];
            if (debug) {
                args.push('--debug')
            }

            const child = child_process.execFile(
                executable,
                args,
                (error, stdout) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(JSON.parse(stdout))
                    }
                }
            );

            child.stderr?.on('data', data => {
                core.info(data.trim())
            });
        })
    }

    private getErrorMessage(error: Error | string): string {
        if (error instanceof Error) {
            return error.message;
        } else {
            return error;
        }
    }

}
