const express = require("express");
const axios = require('axios');
const uploadOnMemory = require("./uploadOnMemory");
const cloudinary = require("./cloudinary");
const app = express();
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 6969;


app.get('/', async (req, res) => {
    try {
        const mobill = await axios.get('http://localhost:9000/mobil');
        console.log('mobil',mobill)
        res.render('index', mobill.data)
    } catch (err) {
        console.log('err', err)
        res.status(500).json(err)      
    }
})


app.get('/oji', async (req, res) => {
    try {
        const id = req.query.oji;
        console.log(id)
        const mobil = await axios.get(`http://localhost:9000/oji/${id}`);
        res.render('index', mobil.data)
    } catch (err) {
        res.status(500).json(err)
    }
})


app.get('/index2', (req, res) => {
    res.render('index2')
})
app.post(
    "/index2",
    uploadOnMemory.single("gambar"),
    (req, res) => {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, { folder: 'test' }, async function (err, result) {
            if (!!err) {
                console.log(err);
                return res.status(400).json({
                    message: "Gagal upload file!",
                });
            }

            const body = req.body;
            body.gambar = result.url;
            console.log(body)
            try {
                const mobil = await axios.post('http://localhost:9000/mobil-addd', body);
                
                return res.redirect("/")
            } catch (err) {
                console.log(err);
                return res.status(500).json(err)
            }
        });
    }
);

app.get('/index3/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const mobil = await axios.get(`http://localhost:9000/mobil/${id}`);
        res.render('index3', mobil.data)
    } catch (err) {
        res.status(500).json(err)
    }
})
app.post(
    "/index3/:id",
    uploadOnMemory.single("gambar"),
    (req, res) => {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, { folder: 'test' }, async function (err, result) {
            if (!!err) {
                console.log(err);
                return res.status(400).json({
                    message: "Gagal upload file!",
                });
            }

            const id = req.params.id;
            const body = req.body;
            body.gambar = result.url;
            try {
                const mobil = await axios.put(`http://localhost:9000/mobil/${id}`, body);
                return res.redirect("/")
            } catch (err) {
                return res.status(500).json(err)
            }
        });
    }
);

app.get('/hapus/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const mobil = await axios.delete(`http://localhost:9000/delete/${id}`);
        res.redirect("/")
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(PORT, () => {
    console.log(`Express nyala di http://localhost:${PORT}`);
});
