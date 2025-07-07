import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pdfUri: {
      type: String,
      required: true,
    },
    coverImageUri: {
      type: String,
      required: true,
    },
    genre: [
      {
        type: String,
      },
    ],
    totalPages: {
      Number,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
