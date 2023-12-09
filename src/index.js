const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const User = mongoose.model('User', {
    nome: String,
    email: String,
    senha: String
});

// Verbos HTTP
app.get('/', async (req,res) => {
    const usuarios = await User.find();
    res.send(usuarios);
});

app.delete("/:id", async (req,res) => {
    const usuario = await User.findByIdAndDelete(req.params.id);
    return res.send(usuario);
});

app.put('/:id', async (req,res) => {
    const usuario = await User.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }, {
        new: true
    });
    return res.send(usuario);
});

app.post('/', async (req,res) => {
    const usuario = new User({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    });

    await usuario.save();
    res.send(usuario);
});

const PORT = 5000;

app.listen(PORT, () => {
    mongoose.connect(DB_MONGO_PASSWORD);
    console.log('App is running...')
});