import Case from "../models/Case.js"
import { calculatePriority, getPriorityLevel, checkEmergency } from "../utils/priorityCalculator.js"
import { getAIRecommendation } from "../utils/aiService.js"


// CREATE NEW CASE
export const createCase = async (req, res) => {

  try {

    const {
      symptoms,
      severity,
      sinceDays,
      previousMedication,
      medicationsTaken
    } = req.body

    if (!symptoms || !severity || !sinceDays) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const priorityScore = calculatePriority(req.body)
    const priorityLevel = getPriorityLevel(priorityScore)
    const emergency = checkEmergency(symptoms)

    let aiRecommendation = null

    try {
      aiRecommendation = await getAIRecommendation(req.body)
    } catch (err) {
      console.log("AI service failed:", err.message)
    }

    const newCase = await Case.create({

      patientId: req.user.id,

      symptoms,
      severity,
      sinceDays,
      previousMedication,
      medicationsTaken,

      priorityScore,
      priorityLevel,
      emergency,

      aiRecommendation
    })

    res.status(201).json(newCase)

  } catch (err) {

    console.log(err)
    res.status(500).json({ message: "Server Error" })

  }
}



/// GET ALL PENDING CASES (TRIAGE ORDER)
export const getPendingCases = async (req, res) => {

  try {

    const cases = await Case.find({ status: "pending" })
      .populate("patientId", "name age gender")
      .sort({
        emergency: -1,
        priorityScore: -1,
        createdAt: 1
      })

    res.json(cases)

  } catch (err) {

    res.status(500).json({ message: "Server Error" })

  }

}



/// DOCTOR TREATS CASE
export const treatCase = async (req, res) => {

  try {

    const caseId = req.params.id
    const { medicines, notes } = req.body

    const updated = await Case.findByIdAndUpdate(

      caseId,

      {
        status: "treated",

        prescription: {
          doctorId: req.user.id,
          medicines,
          notes
        }
      },

      { new: true }

    )

    if (!updated) {
      return res.status(404).json({ message: "Case not found" })
    }

    res.json(updated)

  } catch (err) {

    res.status(500).json({ message: "Server Error" })

  }

}



/// GET SINGLE CASE DETAILS
export const getCaseById = async (req, res) => {

  try {

    const caseId = req.params.id

    const caseData = await Case.findById(caseId)
      .populate("patientId", "name age gender")
      .populate("prescription.doctorId", "name specialization")

    if (!caseData) {
      return res.status(404).json({ message: "Case not found" })
    }

    res.json(caseData)

  } catch (err) {

    res.status(500).json({ message: "Server Error" })

  }

}