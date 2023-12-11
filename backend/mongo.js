const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
console.log(password)

const url =
  `mongodb+srv://susannamkinnunen:${password}@cluster0.ckbru3w.mongodb.net/noteApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Life is easy',
  important: true,
})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

/*note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/