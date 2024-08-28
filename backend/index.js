const connectToMongo = require('./db_conn');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 4000

//middlewares
app.use(cors())
app.use(express.json());

//Available routes
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})