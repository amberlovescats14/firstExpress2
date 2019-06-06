const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const people = require('./People.js')
const exphbs = require('express-handlebars')


const app = express();


//! HANDLEBARS MIDDLEWRE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//homepage route
//if the homepage is below the static file. it will load static
//if the homepage is above static, homepage will load
app.get('/', (req,res) => {
  res.render('index', {
    title: "People App",
    people,
  })
})

//! Init logger middleware
// app.use(logger)

//! the newest version of express has a body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// //! will automatically load index.html, in public folder
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "public", 'index.html'))
// })

//! or set folder STATIC
app.use(express.static(path.join(__dirname, "public")))

//! Bringing in the router file API
app.use('/api/people', require('./routes/api/people'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}
`))