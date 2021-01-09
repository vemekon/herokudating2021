const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      index: true,
    },
    age: {
      type: Number,
    },
    hobby: {
      type: String,
    },
    quote: {
      type: String,
    },
    gender: {
      type: String,
    },
    bio: {
      type: String,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    picture: {
      type: Array,
      default: [],
    },
    friends: [{ type: ObjectId, ref: "User" }],
    messageReceived: [
      {
        content: String,
        sender: { type: ObjectId, ref: "User" },
        date: Date,
        read: { type: String, default: "No" },
      },
    ],
    messageSent: [
      {
        content: String,
        receiver: { type: ObjectId, ref: "User" },
        date: Date,
      },
    ],

    message: [
      {
        connect: { type: ObjectId, ref: "User" },
        content: [{ body: String, to: Boolean, date: Date }],
      },
    ],

    ratings: {
      star: Number,
      postedBy: { type: ObjectId, ref: "User" },
    },
  },
  //ratings: [{ type: ObjectId, ref: "User" }],

  { timestamps: true },
  { typeKey: "$type" }
);

module.exports = mongoose.model("User", userSchema);
