import mongoose from"mongoose";
const requestSchema = new mongoose.Schema(
  {
    mentor: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      image: { type: String },
    },

    learner: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      image: { type: String },
    },

    expectations: { type: String, required: true },

    skills: { type: String, required: true },

    deadline: { type: Date, required: true },

    credits: { type: Number, required: true },
     status: {
      type: String,
      enum: ["pending", "accepted","completing","completed"],
      default: "pending",
    },
  },
  { timestamps: true },

);

const Request = mongoose.model("Request", requestSchema);
export default Request;
