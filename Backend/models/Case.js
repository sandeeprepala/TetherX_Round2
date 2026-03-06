import mongoose from "mongoose"

const CaseSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  symptoms: [String],

  severity: {
    type: String,
    enum: ["mild","moderate","severe"]
  },

  sinceDays: Number,

  previousMedication: Boolean,

  medicationsTaken: [String],

  priorityScore: Number,

  priorityLevel: {
    type: String,
    enum: ["low","medium","high","critical"]
  },

  emergency: Boolean,

  status: {
    type: String,
    enum: ["pending","treated"],
    default: "pending"
  },

  aiRecommendation: {

  medicines: [String],

  reasons: [String],

  sideEffects: [String],

  precautions: [String],

  confidence: Number

},
    prescription: {

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },

    medicines: [
      {
        name: String,
        dosage: String,
        duration: String
      }
    ],

    notes: String
  }

},{timestamps:true})

export default mongoose.model("Case",CaseSchema)