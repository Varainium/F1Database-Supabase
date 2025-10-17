const path = require('path');
const express = require('express');
const router = express.Router();
const supa = require('@supabase/supabase-js');


const supaUrl = 'https://fcawcjcljodgnkxmhczw.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYXdjamNsam9kZ25reG1oY3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTM5MjIsImV4cCI6MjA3NTM2OTkyMn0.LxYgeNf1iitbn7wZ8hkTq9Ap9ty9i4Asj5PdEuhrp7k'

const supabase = supa.createClient(supaUrl, supaAnonKey);

router.get('/api/constructors', async (req, res) => { // WORKS
    const { data, error } = await supabase
        .from('constructors')
        .select('*');
    res.send(data);
});
router.get('/api/constructors/:constructorRef', async (req, res) => {   // WORKS
    try {
        const { data, error, status } = await supabase
            .from('constructors')
            .select('*')
            .eq('constructorRef', req.params.constructorRef);
        if (data.length === 0) {
            return res.status(404).json({ error: `constructorRef '${req.params.constructorRef}' not found` });
        }
        return res.json(data);
    } catch (err) {
        return res.json({ error: 'Data could not be retrieved. Please check for syntax or logic errors.' });
    }
});

module.exports = router;