const path = require('path');
const express = require('express');
const app = express();
const supa = require('@supabase/supabase-js');


const supaUrl = 'https://fcawcjcljodgnkxmhczw.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYXdjamNsam9kZ25reG1oY3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTM5MjIsImV4cCI6MjA3NTM2OTkyMn0.LxYgeNf1iitbn7wZ8hkTq9Ap9ty9i4Asj5PdEuhrp7k'

const supabase = supa.createClient(supaUrl, supaAnonKey);

// const sqlite3 = require('sqlite3').verbose();

// const DB_Path = path.resolve(__dirname, '/data/f1.db');
// const db = new sqlite3.Database(DB_Path);

app.get('/api/circuits', async (req, res) => {
    const {data, error} = await supabase
        .from('circuits')
        .select('*');
        res.send(data);
});

app.get('/api/circuits/:circuitRef', async (req, res) => {

    try {
        const { data, error, status } = await supabase
            .from('circuits')
            .select(`circuitId, circuitRef, name, location, country, lat, lng, alt, url`)
            .eq('circuitRef', req.params.circuitRef)

    
        if (data.length === 0) {
            return res.status(404).json({ error: `circuitRef '${req.params.circuitRef}' not found` });
        }
        return res.json(data);

    } catch (err) {
        return res.json({ error: err.message });
    }
});

app.get('/api/circuits/season/:year', async (req, res) => {
    try {
        const { data, error, status } = await supabase
            .from('races')
            .select(`year, round, circuitId, name, date, time, url, circuit:circuitId (location, country)`)
            .eq('year', req.params.year)
            .order('round', { ascending: true });
        if (data.length === 0) {
            return res.status(404).json({ error: `No races found for year '${req.params.year}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: err.message });
    }
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});