require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const formData = require('form-data');
const multer = require('multer');
const multerConfig = require('./config/multerConfig'); 
const upload = multer(multerConfig.storage);
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./config/swagger.yaml');

const { UserService, FileService, ProjectService } = require('./services');
const userService = new UserService();
const fileService = new FileService();
const projectService = new ProjectService();

const verifyJWT = require('./config/configJWT');

const UserRepository = require('./repository/User')
const userRepository = new UserRepository();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', verifyJWT, function (req, res) {
    res.send("Bem vindo a versão V0.0 do backend da aplicação GestIC!");
});

app.post('/login', async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})

app.post('/register', async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.post('/file',upload.single('file'), async (req, res) => {
    const { file } = req;
    console.log(file);
    try {
        const result = await fileService.insertFile({...req.body,ref:req.file.filename});
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.get('/download-file', function(req, res){
    const file = `${multerConfig.uploadsPath}/${req.body.ref}`;
    res.status(200).download(file);
  });

app.get('/file',async (req,res) => {
    try {
        const result = await fileService.getFiles(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

app.post('/project', async (req,res) =>{
    try {
        const result = await  projectService.insertProject(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

app.get('/project', async (req,res) =>{
    try {
        const result = await  projectService.getProjects();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

app.put('/project', async (req,res) =>{
    try {
        const result = await  projectService.updateProject(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

app.delete('/project/:id', async(req,res) =>{
    try {
        const result = await projectService.deleteProject(req.params);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

app.get('/project/:id', async(req,res) =>{
    try {
        const result = await projectService.getProjectById(req.params);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

app.post('/logout', (req, res) => {
    res.json({ auth: false, token: null });
})


app.get('/test', async (req, res) => {
    const result = await userRepository.getRows({
        profileId: '3a2744c1-fa73-43f1-bceb-a8cee76e5f35'
    })

    console.log(result);
    res.status(500).json(result);
})

const server = app.listen(process.env.SERVER_PORT, function () {
    console.log(`Servidor ativo na porta ${process.env.SERVER_PORT}`);
});

process.on('SIGINT', () => {
    process.kill(process.pid)
    server.close(() => {
        console.log('Process terminated')
    });
});