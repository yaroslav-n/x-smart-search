// mock for test environments
export const getChrome = () => {
    if (typeof chrome !== "undefined") {
        return chrome;
    } else {
        return {
            runtime: {
                getURL: (path: string) => path,
            },
            storage: {
                sync: {
                    get: () => ({}),
                    onChanged: {
                        addListener: () => {},
                        removeListener: () => {},
                    },
                    set: () => {},
                },
            },
        } as unknown as typeof chrome;
    }
};
