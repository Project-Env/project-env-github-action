# Project-Env Github Action

[![Build](https://github.com/Project-Env/project-env-github-action/actions/workflows/build.yml/badge.svg)](https://github.com/Project-Env/project-env-github-action/actions/workflows/build.yml)

This action sets up the runner environment with the Project-Env shell. See [Project-Env](https://project-env.github.io) for more details about Project-Env.

## Inputs

### `cli-version`

Version of [Project-Env CLI](https://github.com/Project-Env/project-env-cli) to use. If not specified, the latest version will be used.

### `cli-debug`

Whether to activate the debug mode of the [Project-Env CLI](https://github.com/Project-Env/project-env-cli).

## Example usage

```yaml
uses: Project-Env/project-env-github-action@v1
with:
  cli-version: '3.27.0'
```

## Versioning

Every release gets a full version tag such as `v1.6.0`. In addition, two short
tags are moved to that release:

| Tag | Points to | Use it when |
| --- | --- | --- |
| `v1` | the latest `v1.x.y` release | you want bug fixes and new features automatically |
| `v1.6` | the latest `v1.6.x` release | you want bug fixes only |
| `v1.6.0` | that exact release | you want a fixed version |

The short tags are moved to a new commit on every release. If you need a
reference that never changes, use the full version tag or a commit SHA:

```yaml
uses: Project-Env/project-env-github-action@8958dac5824fd73ced04459e76f49654b95044a6 # v1.5.0
```
