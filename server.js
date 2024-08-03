


const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const ExcelJS = require('exceljs');
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/../client')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateEmail = (email) => {
    return validator.isEmail(email);
};

const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/.test(phone);
    
};

app.post('/submit', async (req, res) => {
    const { name, email, phone, university, study, languages,options } = req.body;
    console.log(req.body);

    if (!email || !validateEmail(email)) {
        return res.status(400).send("Invalid email");
    }

    if (!phone || !validatePhoneNumber(phone)) {
        return res.status(400).send("Invalid phone number");
    }
    let selectedOptions = options;
        if (selectedOptions) {
            if (Array.isArray(selectedOptions)) {
                console.log(`Selected options: ${selectedOptions.join(', ')}`);
            } else {
                res.status(200).send(`Selected option: ${selectedOptions}`);
            }
        } else {
            res.status(200).send('No options were selected.');
        }

    const id = uuidv4();
    const entryWithId = { id, email, phone, name, university, study, languages,selectedOptions };

    const folderPath = path.join(__dirname, 'datas');
    const filePath = path.join(folderPath, 'data.xlsx');

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
        worksheet = workbook.getWorksheet(1);
if (!worksheet) {
    console.log("Worksheet does not exist, creating a new one.");
    worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 36 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Name', key: 'name', width: 20 },
        { header: 'University', key: 'university', width: 20 },
        { header: 'Study', key: 'study', width: 20 },
        { header: 'Languages', key: 'languages', width: 30 },
        { header: 'Options', key: 'options', width: 30 },
    ];
}

    } else {
        worksheet = workbook.addWorksheet('Sheet1');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 36 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Name', key: 'name', width: 20 },
            { header: 'University', key: 'university', width: 20 },
            { header: 'Study', key: 'study', width: 20 },
            { header: 'Languages', key: 'languages', width: 30 },
            {header: 'Options', key: 'options',width:30 },
        ];
    }

    worksheet.addRow(entryWithId);

    
      
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
  // Write to the file
  try {
            await workbook.xlsx.writeFile(filePath);
            res.status(201).send('Success');
        } catch (err) {
            console.error('Error writing data:', err);
            res.status(500).send('Failed to write data');
        }
    });
app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});





