import { randomNormal } from 'd3-random';

const simulatePath = (S0, mu, sigma, days) => {
    const path = [S0];
    const drift = mu - 0.5 * sigma ** 2; 
    const dailyReturns = randomNormal(drift, sigma);

    for (let i = 1; i < days; i++) {
        const dailyReturn = dailyReturns();
        path.push(path[i-1]*Math.exp(dailyReturn));
    }
    return path;
}

export const monteCarloSimulation = (S0, mu, sigma, days, simulations) => {
    const paths = [];
    for (let i = 0; i<simulations;i++) {
        paths.push(simulatePath(S0, mu, sigma, days));
    }

    return paths;
}