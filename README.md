# Project-Env Github Action
This action sets up the runner environment with the Project-Env shell. See [Project-Env](https://project-env.github.io) for more details about Project-Env.

## Inputs

## `cli-version`

**Required** Version of [Project-Env CLI](https://github.com/Project-Env/project-env-cli) to use.

## Example usage

```shell
uses: project-env/project-env-github-action@v1.0.0
with:
  cli-version: '3.0.4'
```