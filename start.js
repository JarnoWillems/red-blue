import http from 'http';
import fs from 'fs';

const statusFile = './status.json'; // Het pad naar het statusbestand

let status = { red: 0, blue: 0 }; // Standaardstatus

// Lees het statusbestand en converteer de inhoud naar het statusobject
try {
    const data = fs.readFileSync(statusFile, 'utf8');
    status = JSON.parse(data);
    if (!status.red || !status.blue) {
        throw new Error('Ongeldige statusgegevens');
    }
} catch (error) {
    console.error('Fout bij het lezen van statusbestand:', error);
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
    } else if (req.method === 'GET') {
        if (req.url === '/red') {
            res.end(JSON.stringify({ red: status.red }));
        } else if (req.url === '/blue') {
            res.end(JSON.stringify({ blue: status.blue }));
        } else if (req.url === '/status') {
            res.end(JSON.stringify(status));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'page not found' }));
        }
    } else if (req.method === 'PUT') {
        if (req.url === '/red') {
            status.red++;
            res.end(JSON.stringify({ red: status.red }));
        } else if (req.url === '/blue') {
            status.blue++;
            res.end(JSON.stringify({ blue: status.blue }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'page not found' }));
        }

        // Schrijf de bijgewerkte status naar het statusbestand
        fs.writeFile(statusFile, JSON.stringify(status), 'utf8', (error) => {
            if (error) {
                console.error('Fout bij het schrijven naar statusbestand:', error);
            }
        });
    } else {
        res.writeHead(405);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Listening to requests on http://localhost:3000');
});