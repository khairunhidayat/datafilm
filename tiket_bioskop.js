const bodyParser = require('body-parser');
const express = require('express');
const { uuid } = require('uuidv4');
const app = express();

const port = process.env.PORT || 3000;

const dataFilm = []
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(dataFilm);
});

app.post('/', (req, res) => {
    const data = req.body
    console.log(data);
    dataFilm.push({id: uuid(), ...data});
    res.send("Berhasil Post");
}); 

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const data = dataFilm.find(data => data.id == id)
    if (data) {
        dataFilm.splice(dataFilm.indexOf(data), 1);
    }

    console.log(dataFilm);

    res.send('Berhasil hapus data!');
});

app.patch('/:id', (req, res) => {
    const { id } = req.paramsl
    const { nama, harga, jadwal } = req.body;
    const data = dataFilm.find((data) => data.id == id);
    if (nama) data.nama = nama;
    if (harga) data.harga = harga;
    if (jadwal) data.jadwal = jadwal;

    console.log('dataFilm', dataFilm);

    res.send('Berhasil Update!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});