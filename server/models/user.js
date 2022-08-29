const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    length: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  expenses: [
    {
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: String,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.getAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
  return token;
};
userSchema.methods.addExpense = async function (type, price, description,date) {
  try {
    this.expenses = this.expenses.concat({ type, price, description,date });
    await this.save();
    return this.expenses;
  } catch (err) {
    console.log(err);
  }
};
const User = mongoose.model("User", userSchema);
exports.User = User;
