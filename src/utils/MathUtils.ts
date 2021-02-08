const random = (min: number, max: number) => min + (max - min) * Math.random();
const randomInt = (min: number, max: number) => ~~random(min, max);

export const MathUtils = {
    random,
    randomInt,
};
