import fs from 'fs';

const statusFile = 'status.json';

const readStatus = () => {
    try {
        const data = fs.readFileSync(statusFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Als het bestand niet bestaat of er een fout optreedt bij het lezen, retourneer een standaardstatusobject.
        console.error('Fout bij het lezen van statusbestand:', error);
        return { red: 0, blue: 0 };
    }
};

const writeStatus = (status) => {
    try {
        const data = JSON.stringify(status);
        fs.writeFileSync(statusFile, data, 'utf8');
    } catch (error) {
        console.error('Fout bij het schrijven naar statusbestand:', error);
    }
};

// Voorbeeldgebruik:
const status = readStatus();
console.log('Huidige status:', status);

status.red++; // Verhoog de rode waarde met 1

writeStatus(status);
console.log('Status bijgewerkt.');