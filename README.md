# Base files for nodejs projects using typescript

## Libraries/Guides used

### Eslint

- https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md

### Jest

- https://github.com/swc-project/jest

---

# Usage/Installation

1. Install the correct versions of each package, which are listed by the command:

```shell
$ npm info @unikum/base-nodejs peerDependencies

# yarn or whatever package manager you prefer
$ npm install @unikum/base-nodejs
```

2. Install the correct versions of each package, which are listed by the command:
   `npx install-peerdeps --dev @unikum/base-nodejs`

3. Optional - copy relevant config/dot files from `file-base` directory to your project.

---

# Development

- `npm run prepare-release` - build, lint, test before publish (this is already a git pre-commit hook)
