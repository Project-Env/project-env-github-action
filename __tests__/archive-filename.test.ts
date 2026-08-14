import ProjectEnvGithubAction from "../src/project-env-github-action";
import * as os from "os";

jest.mock("os", () => ({
    ...jest.requireActual("os"),
    platform: jest.fn(),
    arch: jest.fn()
}));

const mockedOs = os as jest.Mocked<typeof os>;

function archiveFilename(platform: string, arch: string) {
    mockedOs.platform.mockReturnValue(platform as any);
    mockedOs.arch.mockReturnValue(arch as any);

    return (new ProjectEnvGithubAction() as any).createProjectEnvCliArchiveFilename('3.27.0');
}

describe('Project-Env CLI archive filename', () => {

    test('linux amd64', () => {
        expect(archiveFilename('linux', 'x64')).toBe('cli-3.27.0-linux-amd64.tar.gz');
    });

    test('linux aarch64', () => {
        expect(archiveFilename('linux', 'arm64')).toBe('cli-3.27.0-linux-aarch64.tar.gz');
    });

    test('macos amd64', () => {
        expect(archiveFilename('darwin', 'x64')).toBe('cli-3.27.0-macos-amd64.tar.gz');
    });

    test('macos aarch64', () => {
        expect(archiveFilename('darwin', 'arm64')).toBe('cli-3.27.0-macos-aarch64.tar.gz');
    });

    test('windows amd64', () => {
        expect(archiveFilename('win32', 'x64')).toBe('cli-3.27.0-windows-amd64.zip');
    });

    test('unsupported CPU arch is rejected', () => {
        expect(() => archiveFilename('linux', 'ppc64')).toThrow('unsupported CPU arch ppc64');
    });

});
