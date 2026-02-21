import { spawn } from 'child_process';
import ExpHistory from '../models/exp_HistoryModel.js';

export const getDashboardStats = async (req, res) => {
    console.log("Dashboard stats request received for user:", req.user.id);
    try {
        const history = await ExpHistory.findAll({ 
            where: { userId: req.user.id },
            raw: true 
        });

        const python = spawn('python', ['internal/analyzer.py']);
        let result = '';
        let errorOutput = '';

        python.stdin.write(JSON.stringify(history));
        python.stdin.end();

        python.stdout.on('data', (data) => { result += data.toString(); });
        
        python.stderr.on('data', (data) => { errorOutput += data.toString(); });

        python.on('close', (code) => {
            if (code !== 0) {
                console.error("Python Error Output:", errorOutput);
                return res.status(500).json({ error: "Python Error", details: errorOutput });
            }
            try {
                res.json(JSON.parse(result));
            } catch (parseError) {
                res.status(500).json({ error: "Błąd parsowania danych z Pythona" });
            }
        });
    } catch (err) {
        console.error("Controller Error:", err);
        res.status(500).json({ error: err.message });
    }
};