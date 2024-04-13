import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { monteCarloSimulation } from '../utils/simulateStocks';

const MonteCarloSimulator = () => {
    const [days, setDays] = useState(365);
    const [simulations, setSimulations] = useState(100);
    const [S0, setS0] = useState(100); // Initial stock price
    const [mu, setMu] = useState(0.05); // Drift = Mean of returns
    const [sigma, setSigma] = useState(0.2); // Volatility = Standard deviation of returns
    const [paths, setPaths] = useState([]);
    const [submitted, setSubmitted] = useState(false);


    const runSimulation = () => {
        const newPaths = monteCarloSimulation(S0, mu, sigma, days, simulations);
        setPaths(newPaths);
        setSubmitted(true);

    };

    return (
        <div style={{ margin: "20px" }}>
            <h1>Monte Carlo Stock Price Simulation</h1>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Days: <input type="number" value={days} onChange={e => setDays(+e.target.value)} />
                </label>
                <label>
                    Simulations: <input type="number" value={simulations} onChange={e => setSimulations(+e.target.value)} />
                </label>
                <label>
                    Initial Stock Price ($): <input type="number" value={S0} onChange={e => setS0(+e.target.value)} />
                </label>
                <label>
                    Drift (μ): <input type="number" step="0.01" value={mu} onChange={e => setMu(+e.target.value)} />
                </label>
                <label>
                    Volatility (σ): <input type="number" step="0.01" value={sigma} onChange={e => setSigma(+e.target.value)} />
                </label>
            </div>
            <button onClick={runSimulation} style={{ padding: "10px", fontSize: "16px" }}>Run Simulation</button>
            {submitted && <Plot
                data={
                    paths.map((path, index) => ({
                        x: Array.from({ length: days }, (_, i) => i + 1),
                        y: path,
                        type: 'scatter',
                        mode: 'lines',
                        name: `Simulation ${index + 1}`
                    }))
                }
                layout={{ width: 740, height: 400, title: 'Monte Carlo Stock Price Simulations' }}
            />}
        </div>
    );
}

export default MonteCarloSimulator;
