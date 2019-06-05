const express = require('express')
const path = require('path')

const app = express();

// //! will automatically load index.html, in public folder
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "public", 'index.html'))
// })

//! or set folder
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))