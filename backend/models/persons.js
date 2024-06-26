const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneValidator = (value) => {
  // Check if the phone number length is at least 8
  if (value.length < 8) return false

  // Split the phone number into parts
  const parts = value.split('-')
  if (parts.length !== 2) return false

  const [part1, part2] = parts

  // Check if the first part has 2 or 3 digits
  if (!/^\d{2,3}$/.test(part1)) return false

  // Check if the second part contains only digits
  return !(!/^\d+$/.test(part2));
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: phoneValidator,
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
