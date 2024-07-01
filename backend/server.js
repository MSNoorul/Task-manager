// creat a basice server with sequelize and express
const express = require('express')
require('dotenv').config()
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3500

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))


app.use('/auth', require('./routes/authRoutes'))
app.use('/task', require('./routes/taskRoutes'))


connectDB.authenticate()
    .then(() => {;
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        connectDB.sync({ force: false }).then(() => {
            console.log('Database & tables created!');
          });
    })
    .catch(err => console.error('Unable to connect to the database:', err))

