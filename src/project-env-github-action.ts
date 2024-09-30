import * as core from '@actions/core'
import * as httpClient from '@actions/http-client'
import * as toolCache from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as os from "os";
import * as path from 'path'
import * as fs from "fs";

interface ToolInfo {
    environmentVariables: { [key: string]: string };
    pathElements: string[];
}

type AllToolInfos = { [key: string]: ToolInfo[] };

export default class ProjectEnvGithubAction {

    async run() {
        try {
            this.fixRunnerEnvironment();

            const configFile = core.getInput('config-file') || 'project-env.toml';
            const cliVersion = core.getInput('cli-version') || (await this.resolveLatestProjectEnvCliVersion());
            const cliDebug = core.getInput('cli-debug') === 'true'

            const archiveUrl = await this.resolveProjectEnvCliArchiveUrl(cliVersion);
            const archive = await toolCache.downloadTool(archiveUrl);

            const extractedArchive = await this.extractProjectEnvCliArchive(archive, archiveUrl);
            core.addPath(extractedArchive);

            const executable = this.resolveProjectEnvCliExecutable(extractedArchive);

            const allToolInfos = await this.executeProjectEnvCli(executable, configFile, cliDebug);
            core.debug(`resulting tool infos: ${JSON.stringify(allToolInfos)}`);

            this.processToolInfos(allToolInfos);
        } catch (error: any) {
            core.setFailed(this.getErrorMessage(error));
        }
    }

    private fixRunnerEnvironment() {
        if (os.platform() === 'win32') {
            // Because of any reason, the powershell executable is not registered on the path,
            // therefore it cannot be used, e.g. in case we are unzipping an archive with the
            // Github Actions toolkit.
            core.addPath('C:/Program Files/PowerShell/7')
        }
    }

    private async resolveLatestProjectEnvCliVersion() {
        const response = await new httpClient.HttpClient(undefined, undefined, {allowRedirects: false}).get("https://github.com/Project-Env/project-env-cli/releases/latest")

        const statusCode = response.message.statusCode;
        const location = response.message.headers.location;
        if (statusCode !== 302 || !location) {
            throw new Error("failed to resolve latest Project-Env CLI version");
        }

        const version = location.match(/.+\/v(.+)$/)?.[1]
        if (!version) {
            throw new Error("failed to resolve latest Project-Env CLI version");
        }

        return version;
    }

    private async resolveProjectEnvCliArchiveUrl(cliVersion: string) {
        const archiveBaseUrl = this.createProjectEnvCliArchiveBaseUrl(cliVersion);
        const archiveFilename = this.createProjectEnvCliArchiveFilename(cliVersion);
        const archiveUrl = `${archiveBaseUrl}/${archiveFilename}`;

        if (this.getOsName() === 'macos' && this.getCpuArch() === 'aarch64' && !(await this.archiveUrlExists(archiveUrl))) {
            return `${archiveBaseUrl}/${this.createProjectEnvCliArchiveFilename(cliVersion, 'amd64')}`
        } else {
            return `${archiveBaseUrl}/${archiveFilename}`
        }
    }

    private createProjectEnvCliArchiveBaseUrl(cliVersion: string) {
        return `https://github.com/Project-Env/project-env-cli/releases/download/v${cliVersion}`;
    }

    private createProjectEnvCliArchiveFilename(cliVersion: string, enforcedCpuArch?: string) {
        const osName = this.getOsName();
        const cpuArch = enforcedCpuArch ? enforcedCpuArch : this.getCpuArch();
        const fileExt = this.getFileExtension();

        return `cli-${cliVersion}-${osName}-${cpuArch}.${fileExt}`;
    }

    private async archiveUrlExists(archiveUrl: string) {
        const response = await new httpClient.HttpClient(undefined, undefined, {allowRedirects: false}).get(archiveUrl)

        return response.message.statusCode === 302;
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

    private getCpuArch() {
        if (os.platform() === 'darwin') {
            switch (os.arch()) {
                case "x64":
                    return 'amd64'
                case "arm64":
                    return 'aarch64'
                default:
                    throw new Error(`unsupported CPU arch ${process.arch}`)
            }
        } else {
            switch (os.arch()) {
                case "x64":
                    return 'amd64'
                default:
                    throw new Error(`unsupported CPU arch ${process.arch}`)
            }
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

    private async extractProjectEnvCliArchive(archive: string, archiveUrl: string) {
        if (archiveUrl.endsWith('zip')) {
            return await toolCache.extractZip(archive);
        } else {
            return await toolCache.extractTar(archive);
        }
    }

    private processToolInfos(allToolInfos: AllToolInfos) {
        for (const toolName of Object.keys(allToolInfos)) {
            const toolInfos = allToolInfos[toolName] || [];
            for (const toolInfo of toolInfos) {
                const pathElements = toolInfo.pathElements || [];
                for (const pathElement of pathElements) {
                    core.addPath(pathElement);
                }

                const environmentVariables = toolInfo.environmentVariables || {};
                for (const environmentVariableName of Object.keys(environmentVariables)) {
                    const environmentVariableValue = environmentVariables[environmentVariableName];
                    core.exportVariable(environmentVariableName, environmentVariableValue);
                }
            }
        }
    }

    private resolveProjectEnvCliExecutable(sourceDirectory: string) {
        const executableFilename = `project-env-cli${this.getExecutableExtension()}`;
        const executable = path.join(sourceDirectory, executableFilename);
        if (!fs.existsSync(executable)) {
            throw new Error(`could not find Project-Env CLI at ${executable}`);
        }

        return executable;
    }

    private async executeProjectEnvCli(executable: string, configFile: string, debug: boolean) {
        let args = ['--config-file', configFile];
        if (debug) {
            args.push('--debug')
        }

        const stdOutput = await exec.getExecOutput(executable, args, {
            listeners: {
                debug: (message) => core.debug(message)
            }
        });

        return JSON.parse(stdOutput.stdout);
    }

    private getExecutableExtension() {
        return os.platform() === 'win32' ? '.exe' : '';
    }

    private getErrorMessage(error: Error | string): string {
        if (error instanceof Error) {
            return error.message;
        } else {
            return error;
        }
    }

}
