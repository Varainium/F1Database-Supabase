const path = require('path');
const express = require('express');
const app = express();
const supa = require('@supabase/supabase-js');


const supaUrl = 'https://fcawcjcljodgnkxmhczw.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYXdjamNsam9kZ25reG1oY3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTM5MjIsImV4cCI6MjA3NTM2OTkyMn0.LxYgeNf1iitbn7wZ8hkTq9Ap9ty9i4Asj5PdEuhrp7k'

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/api/races/:raceId', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('races')
            .select('name, circuits!inner (location, country, url), year, date, time')
            .eq('raceId', req.params.raceId);
        if (data.length === 0) {
            return res.status(404).json({ error: `raceId '${req.params.raceId}' not found` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/races/season/:year', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('races')
            .select('name, year, round, date, time')
            .eq('year', req.params.year)
            .order('round', { ascending: true });
        if (data.length === 0) {
            return res.status(404).json({ error: `No races found for year '${req.params.year}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/races/season/:year/:round', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('races')
            .select('name, year, round, date, time')
            .eq('year', req.params.year)
            .eq('round', req.params.round);
        if (data.length === 0) {
            return res.status(404).json({ error: `No races found for year '${req.params.year}' and round '${req.params.round}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/races/circuits/:circuitRef', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('races')
            .select('year, round, name, date, time, url, circuits!inner (name, location, country)')
            .eq('circuits.circuitRef', req.params.circuitRef);
        if (data.length === 0) {
            return res.status(404).json({ error: `No races found for circuitRef '${req.params.circuitRef}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/races/circuits/:circuitRef/season/:start/:end', async (req, res) => { // WORKS
    try { 
        if (req.params.end < req.params.start) {
            return res.status(400).json({ error: `End year '${req.params.end}' cannot be less than start year '${req.params.start}'` });
        }
        const { data, error, status } = await supabase
            .from('races')
            .select('year, round, name, date, time , url, circuits!inner (circuitRef)')
            .eq('circuits.circuitRef', req.params.circuitRef)
            .gte('year', req.params.start)
            .lte('year', req.params.end);
        if (data.length === 0) {
            return res.status(404).json({ error: `No races found for circuitRef '${req.params.circuitRef}' between years '${req.params.start}' and '${req.params.end}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/results/:raceId', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('results')
            .select('drivers!inner (driverRef, code, forename, surname), constructors!inner (constructorRef, name, nationality), races!inner (name, year, date)')
            .eq('raceId', req.params.raceId)
            .order('grid', { ascending: true });
        if (data.length === 0) {
            return res.status(404).json({ error: `No results found for raceId '${req.params.raceId}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/qualifying/:raceId', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('qualifying')
            .select('drivers!inner (driverRef, code, forename, surname), constructors!inner (constructorRef, name ,nationality), races!inner (name, year, date), number, position, q1, q2, q3')
            .eq('raceId', req.params.raceId)
            .order('position', { ascending: true });
        if (data.length === 0) {
            return res.status(404).json({ error: `No qualifying results found for raceId '${req.params.raceId}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/standings/drivers/:raceId', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('driverStandings')
            .select('drivers!inner (driverRef, code, forename, surname), races!inner (name, round, year, date), points, position, positionText, wins')
            .eq('raceId', req.params.raceId)
            .order('position', { ascending: true });
        if (data.length === 0) {
            return res.status(404).json({ error: `No driver standings found for raceId '${req.params.raceId}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});
app.get('/api/standings/constructors/:raceId', async (req, res) => { // WORKS
    try {
        const { data, error, status } = await supabase
            .from('constructorStandings')
            .select('constructors!inner (constructorRef, name, nationality), races!inner (name, round, year, date), points, position, positionText, wins')
            .eq('raceId', req.params.raceId)
            .order('position', { ascending: true });
        if (data.length === 0) {
            return res.status(404).json({ error: `No constructor standings found for raceId '${req.params.raceId}'` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});

app.listen(8050, () => {
    console.log('Server is running on port 8050');
});