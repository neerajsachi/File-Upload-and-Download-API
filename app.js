require('dotenv').config()


const express = require('express')
const app= express()
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken');

app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
    fileFilter: function (req, file, cb) {
      const filetypes = /pdf/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (extname) {
        return cb(null, true);
      }
      cb('only pdf allowed');
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully.');
});

app.post('/login', (req, res) =>
{
    const username= req.body.username
    const user={ name : username }
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken : accessToken })
})
  
function authenticateToken(req, res, next){
  const authHeader =  req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
      if(err) return res.sendStatus(403)
      req.user=user
      next()
  })
}

app.get('/download/:filename', authenticateToken, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.download(filePath, filename, (err) => {
    console.log("File downloaded succesfully")
    if (err) {
      res.status(404).send('File not found.');
    }
  });
});


app.listen(6000)