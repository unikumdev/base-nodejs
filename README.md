# Base files for nodejs projects using typescript

## Libraries/Guides used

### Eslint

- https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md

---

# Usage/Installation

1. Install the correct versions of each package, which are listed by the command:

```shell
$ (pn)npm info @unikum/base-nodejs peerDependencies

# yarn or whatever package manager you prefer
$ (pn)npm install @unikum/base-nodejs
```

2. Install the correct versions of each package, which are listed by the command:
   `npx install-peerdeps --dev @unikum/base-nodejs`

3. Optional - copy relevant config/dot files from `file-base` directory to your project.

---

# Development

- `pnpm run prepare-release` - build, lint, test before publish (this is already a git pre-commit hook)
