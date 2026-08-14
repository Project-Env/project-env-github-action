import {jest} from '@jest/globals';
import {createRequire} from 'module';

// Only platform and arch are stubbed. The rest of the module is kept, because
// @actions/core imports other members such as EOL from it.
const actualOs = createRequire(import.meta.url)('os');

jest.unstable_mockModule('os', () => ({
    ...actualOs,
    default: actualOs,
    platform: jest.fn(),
    arch: jest.fn()
}));

const os = await import('os');
const {default: ProjectEnvGithubAction} = await import('../src/project-env-github-action.js');

function archiveFilename(platform: string, arch: string) {
    (os.platform as any).mockReturnValue(platform);
    (os.arch as any).mockReturnValue(arch);

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
