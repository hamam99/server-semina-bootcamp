const mongoose = require('mongoose')
const { Schema } = mongoose

let ticketCategoriesSchema = Schema(
  {
    type: { type: String, required: [true, 'Tipe tiket harus diisi'] },
    price: {
      type: Number,
      required: [true, 'Harga tiket harus diisi'],
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    statusTicketCategories: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    expired: {
      date: Date,
    },
  },
  {
    timestamps: true,
  }
)

let eventSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul harus diisi'],
      minLength: [3, 'Judul minimal 3 karakter'],
      maxLength: [50, 'Judul maksimal 20 karakter'],
    },
    date: { type: Date, required: [true, 'Tanggal harus diisi'] },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline harus diisi'],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, 'Tempat tidak diisi'],
    },
    statusEvent: {
      type: String,
      enum: ['Draft', 'Published', 'archive'],
      default: 'Draft',
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
