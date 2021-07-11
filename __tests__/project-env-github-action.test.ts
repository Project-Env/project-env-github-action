import ProjectEnvGithubAction from "../src/project-env-github-action";

describe('Project-Env Github Action', () => {

    const ENV_BACKUP = process.env;
    const CLI_VERSION = '3.0.4';

    beforeEach(() => {
        process.env = {
            ...{'INPUT_CLI-VERSION': CLI_VERSION},
            ...ENV_BACKUP
        };
    });

    afterAll(() => {
        process.env = ENV_BACKUP;
    });

    test('works', async () => {
        await new ProjectEnvGithubAction().run();

        expect(process.exitCode).toBeUndefined();
    }, 5 * 60 * 1000);

});