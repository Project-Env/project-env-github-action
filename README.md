# Project-Env Github Action

![Build](https://github.com/Project-Env/project-env-github-action/workflows/Build/badge.svg)

This action sets up the runner environment with the Project-Env shell. See [Project-Env](https://project-env.github.io) for more details about Project-Env.

## Inputs

## `cli-version`

**Required** Version of [Project-Env CLI](https://github.com/Project-Env/project-env-cli) to use.

## `cli-debug`

Whether to activate the debug mode of the [Project-Env CLI](https://github.com/Project-Env/project-env-cli).

## Example usage

```shell
uses: project-env/project-env-github-action@v1.0.0
with:
  cli-version: '3.0.4'
```