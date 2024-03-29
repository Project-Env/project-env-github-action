# Project-Env Github Action

[![Build](https://github.com/Project-Env/project-env-github-action/actions/workflows/build.yml/badge.svg)](https://github.com/Project-Env/project-env-github-action/actions/workflows/build.yml)

This action sets up the runner environment with the Project-Env shell. See [Project-Env](https://project-env.github.io) for more details about Project-Env.

## Inputs

## `cli-version`

Version of [Project-Env CLI](https://github.com/Project-Env/project-env-cli) to use. If not specified, the latest version will be used.

## `cli-debug`

Whether to activate the debug mode of the [Project-Env CLI](https://github.com/Project-Env/project-env-cli).

## Example usage

```shell
uses: project-env/project-env-github-action@v1.0.0
with:
  cli-version: '3.0.4'
```
