const express = require('express')
const cors = require('cors')
const multer = require('multer')
const excelToJson = require('convert-excel-to-json')
const fs = require('fs-extra')


const Employee = require("../src/model/model");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

var upload = multer({ dest: "uploads/" })
app.post("/read", upload.single('file'), (req, res) => {

    try {
        if (req.file?.filename == null || req.file?.filename == 'undefined') {
            res.status(400).json("no file")
        } else {

            var filePath = 'uploads/' + req.file.filename

            const excelData = excelToJson({
                sourceFile: filePath,

                header: {
                    rows: 2
                },
                columnToKey: {
                    A: 'id_empleados',
                    B: 'nombre_empleados',
                    C: 'fecha_empleados',
                    D: 'entrada_empleados',
                    E: 'salida_empleados'
                }
            });

            fs.remove(filePath)

            const datas = Employee.bulkCreate(excelData.Sheet1, {
                ignoreDuplicates: true,
            }).then(() => console.log("Users data have been saved"));

            res.status(201).json(excelData.Sheet1);
        }

    } catch {

        res.status(500);


    }

})


app.get("/", async (req, res) => {

    const data = await Employee.findAll();
    res.status(200).json(data)

})

app.get("/consultar/:id", async (req, res) => {
    const { id } = req.params;
    const data = await Employee.findAll({
        where: {
            id_empleados: id,
        }
    });
    res.status(200).json(data)

})

app.post("/insertar", async (req, res) => {

    const { nombre, fecha, entrada, salida } = req.body;

    const insert = await Employee.create({
        nombre_empleados: nombre,
        fecha_empleados: fecha,
        entrada_empleados: entrada,
        salida_empleados: salida

    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "perfecto"
    });

    //res.send(`${nombre}:${fecha}`);

})

app.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;

    const { nombre, fecha, entrada, salida } = req.body;

    const actualiza = await Employee.update({
        nombre_empleados: nombre,
        fecha_empleados: fecha,
        entrada_empleados: entrada,
        salida_empleados: salida,

    }, {
        where: {
            id_empleados: id
        }
    });


})

app.delete("/borrar/:id", async (req, res) => {
    const { id } = req.params;

    await Employee.destroy({
        where: {
            id_empleados: id,
        }
    });


})






app.listen(3000, () => {
    console.log("servidor encendido");
})