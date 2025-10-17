const path = require('path');
const express = require('express');
const app = express();
const supa = require('@supabase/supabase-js');


const supaUrl = 'https://fcawcjcljodgnkxmhczw.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYXdjamNsam9kZ25reG1oY3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTM5MjIsImV4cCI6MjA3NTM2OTkyMn0.LxYgeNf1iitbn7wZ8hkTq9Ap9ty9i4Asj5PdEuhrp7k'

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/api/drivers', async (req, res) => {
    const { data, error} = await supabase
        .from('drivers')
        .select('*');
        res.send(data);
});

app.get('/api/drivers/:driverRef', async (req, res) => {    // WORKS
    try {
        const { data, error, status } = await supabase
            .from('drivers')
            .select('*')
            .eq('driverRef', req.params.driverRef);
        if (data.length === 0) {
            return res.status(404).json({ error: `driverRef '${req.params.driverRef}' not found` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/drivers/search/:substring', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
                .from('drivers')
                .select('*')
                .ilike('surname', `%${req.params.substring}%`);
        if (data.length === 0) {
            return res.status(404).json({ error: `No drivers found with substring '${req.params.substring}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/drivers/race/:raceId', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('drivers')
            .select('driverId, results!inner (raceId), number, forename, surname, dob, nationality')
            .eq('results.raceId', req.params.raceId);
        if (data.length === 0) {
            return res.status(404).json({ error: `No drivers found for raceId '${req.params.raceId}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/results/drivers/:driverRef', async (req, res) => { // WORKS Hamilton
    try {
        const { data, error, status } = await supabase
            .from('results')
            .select('drivers!inner (forename, surname, nationality), races!inner (name, year), positionText, positionOrder, points, laps, time, milliseconds, fastestLap, rank, fastestLapTime, fastestLapSpeed')
            .eq('drivers.driverRef', req.params.driverRef);
        if (data.length === 0) {
            return res.status(404).json({ error: `No results found for driverRef '${req.params.driverRef}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/results/drivers/:driverRef/seasons/:start/:end', async (req, res) => { // WORKS hamilton, 2008-2010
    try {
        if (req.params.end < req.params.start) {
            return res.status(400).json({ error: `End year '${req.params.end}' cannot be less than start year '${req.params.start}'` });
        }
        const { data, error, status } = await supabase
            .from('results')
            .select('drivers!inner (forename, surname, nationality), races!inner (name, year), number, grid, position, positionText, positionOrder, points, laps, time, milliseconds, fastestLap, rank, fastestLapTime, fastestLapSpeed')
            .eq('drivers.driverRef', req.params.driverRef)
            .gte('races.year', req.params.start)
            .lte('races.year', req.params.end);
        if (data.length === 0) {
            return res.status(404).json({ error: `No results found for driverRef '${req.params.driverRef}' between years '${req.params.start}' and '${req.params.end}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});

app.listen(8060, () => {
    console.log('Server is running on port 8060');
});