const mongoose = require('mongoose')
const { model, Schema } = mongoose
const bycript = require('bcryptjs')

let userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama harus diisi'],
      minLength: [3, 'Nama minimal 3 karakter'],
      maxLength: [100, 'Nama maksimal 100 karakter'],
    },
    email: {
      type: String,
      required: [true, 'Email harus diisi'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Kata sandi harus diisi'],
      minLength: [6, 'Kata sandi minimal 6 karakter'],
    },
    role: {
      type: String,
      required: [true, 'Role harus di isi'],
      enum: ['admin', 'organizer', 'owner'],
      default: 'admin',
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bycript.hash(user.password, 12)
  }

  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycript.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = model('Users', userSchema)
