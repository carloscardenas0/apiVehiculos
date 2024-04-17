const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let vehiculos = [{ placa: "FVQ2345A", marca: "Nissan", modelo: "versa" }];

app.get('/vehiculos', (req, res) => {
    res.json({ vehiculos: vehiculos });
});

app.get('/vehiculos/:placa', (req, res) => {
    const placa = req.params.placa;
    const vehiculo = vehiculos.find(v => v.placa === placa);
    if (vehiculo) {
        res.json({ vehiculo: vehiculo });
    } else {
        res.status(404).json({ message: 'Vehículo no encontrado' });
    }
});

app.post('/vehiculos', (req, res) => {
    const { placa, marca, modelo } = req.body;
    const existente = vehiculos.find(v => v.placa === placa);
    if (existente) {
        res.status(400).json({ message: 'Ya existe un vehículo con esa placa' });
    } else {
        vehiculos.push({ placa, marca, modelo });
        res.status(201).json({ message: 'Vehículo agregado correctamente' });
    }
});

app.delete('/vehiculos/:placa', (req, res) => {
    const placa = req.params.placa;
    const indice = vehiculos.findIndex(v => v.placa === placa);
    if (indice !== -1) {
        vehiculos.splice(indice, 1);
        res.json({ message: 'Vehículo eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'Vehículo no encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Escuchando en puerto 3000');
});
