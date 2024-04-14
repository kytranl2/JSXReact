import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const MonteCarloSimulator = () => {
    const [T, setT] = useState(1); // Total time in years
    const [dt, setDt] = useState(0.1); // Time step in years
    const [simulations, setSimulations] = useState(100);
    const [S0, setS0] = useState(100); // Initial stock price
    const [mu, setMu] = useState(0.05); // Drift = Mean of returns
    const [sigma, setSigma] = useState(0.2); // Volatility = Standard deviation of returns
    const [paths, setPaths] = useState([]);
    const [loading, setLoading] = useState(false);


    const runSimulation = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:8000/api/simulate/', {
                S0, mu, sigma, T, dt, simulations
            });
            setPaths(data.paths);
        } catch (error) {
            console.error('Error fetching simulation data:', error);
            alert('Failed to fetch simulation data.');
        }
     
        setLoading(false);

    };

    return (
        <div style={{ margin: "20px" }}>
            <h1>Monte Carlo Stock Price Simulation</h1>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Total time in years: <input type="number" value={T} onChange={e => setT(+e.target.value)} disabled={loading}  />
                </label>
                <label>
                    Time step in years: <input type="number" value={dt} onChange={e => setDt(+e.target.value)} disabled={loading}  />
                </label>
                <label>
                    Simulations: <input type="number" value={simulations} onChange={e => setSimulations(+e.target.value)} disabled={loading} />
                </label>
                <label>
                    Initial Stock Price ($): <input type="number" value={S0} onChange={e => setS0(+e.target.value)} disabled={loading} />
                </label>
                <label>
                    Drift (μ): <input type="number" step="0.01" value={mu} onChange={e => setMu(+e.target.value)} disabled={loading}/>
                </label>
                <label>
                    Volatility (σ): <input type="number" step="0.01" value={sigma} onChange={e => setSigma(+e.target.value)} disabled={loading}/>
                </label>
            </div>
            <button onClick={runSimulation} disabled={loading} style={{ padding: "10px", fontSize: "16px" }}>{loading ? 'Running Simulation...' : 'Run Simulation'}
            </button>
            {paths.length > 0 && <Plot
                data={
                    paths.map((path, index) => ({
                        x: Array.from({ length: T/dt }, (_, i) => i * dt),
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
