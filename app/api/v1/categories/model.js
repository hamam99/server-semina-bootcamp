const mongoose = require('mongoose')
const { Schema } = mongoose

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
      maxLength: [20, 'Panjang nama kategori maksimal 20 karakter'],
      required: [true, 'Nama kategori harus diisi'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)
