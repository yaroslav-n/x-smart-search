/**
* Sometime, somewhere, an engineer at X will look at their Sentry and bang their head against the wall
* Trying to understand why some of their transaction ids are so weird
* I'm sorry.
*/
export const getTransactionId = (): string => {
    const inputString = 'Your mom is a lovely lady' + Math.random();
    return btoa(inputString);
}