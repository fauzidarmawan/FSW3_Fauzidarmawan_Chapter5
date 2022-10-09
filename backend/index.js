const express = require("express");
const {mobil} = require('./models');
const app = express();
const PORT = 9000;
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//add mobil
app.post('/mobil-addd', (req,res)=>{
    const body = req.body
        console.log(body)

    mobil.create(body).then(mobill => {
        res.status(200).json({data:mobill})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

//get all mobil
app.get('/mobil', (req,res)=>{
    mobil.findAll().then(mobill => {
        res.status(200).json({data:mobill})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

//get specific mobil by size
app.get('/oji/:oji', (req, res) => {
    const id = req.params.oji;
    console.log(id)
    mobil.findAll({
  where: {
    ukuran: id
  }
}).then(mobill => {
        res.status(200).json({ data: mobill })
    }).catch(err => {
        res.status(500).json(err)
    });
})

//get specific mobil by id
app.get('/mobil/:id', (req, res) => {
    const id = req.params.id;
    mobil.findByPk(id).then(mobill => {
        res.status(200).json({ data: mobill })
    }).catch(err => {
        res.status(500).json(err)
    });
})

//update mobil
app.put('/mobil/:id', (req,res)=>{
    const id = req.params.id;
    const body = req.body
    mobil.update(body,{where:{'id':id}}).then(mobill => {
        res.status(200).json({data:mobill})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

//delete mobil
app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    mobil.destroy({where:{'id':id}}).then(mobill => {
        res.status(200).json({data:mobill})
    }).catch(err =>{
        res.status(500).json(err)
    })
})



app.listen(PORT, () => {
    console.log("Berhasil! Silahkan akses http://localhost:%d", PORT);
});






