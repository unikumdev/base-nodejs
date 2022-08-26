export const nodeModuleIsAvailable = (name) => {
    try {
        require.resolve(name);
        return true;
    }
    catch {
        return false;
    }
};
