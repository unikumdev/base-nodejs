import { join } from 'path';
class Configuration {
    static createPathsConfig = ({ pathRoot }) => ({
        dirs: {
            root: pathRoot,
        },
        files: {
            'package.json': join(pathRoot, 'package.json'),
        },
    });
    paths;
    constructor({ pathRoot }) {
        this.paths = Configuration.createPathsConfig({ pathRoot });
    }
}
export { Configuration };
