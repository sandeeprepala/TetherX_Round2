const symptomWeights = {

  // Critical Symptoms (Emergency)
  "cardiac arrest": 10,
  "heart pain": 10,
  "chest pain": 10,
  "severe breathing difficulty": 10,
  "unconsciousness": 10,
  "seizure": 10,
  "stroke symptoms": 10,
  "severe bleeding": 10,
  "loss of vision": 10,

  // Very High Priority
  "breathing issue": 9,
  "shortness of breath": 9,
  "oxygen drop": 9,
  "severe chest tightness": 9,
  "high blood pressure crisis": 9,
  "confusion": 9,
  "extreme weakness": 9,

  // High Priority
  "high fever": 7,
  "persistent vomiting": 7,
  "severe abdominal pain": 7,
  "dehydration": 7,
  "severe headache": 7,
  "fainting": 7,
  "rapid heartbeat": 7,
  "blood in vomit": 7,
  "blood in stool": 7,

  // Moderate Symptoms
  "vomiting": 6,
  "dizziness": 6,
  "moderate fever": 6,
  "migraine": 6,
  "body pain": 6,
  "muscle pain": 6,
  "joint pain": 6,
  "fatigue": 6,
  "nausea": 6,
  "diarrhea": 6,

  // Low Priority
  "headache": 3,
  "sore throat": 3,
  "mild cough": 3,
  "runny nose": 3,
  "mild fever": 3,
  "skin rash": 3,
  "itching": 3,

  // Very Low Priority
  "cold": 2,
  "cough": 2,
  "sneezing": 2,
  "mild body pain": 2,
  "mild tiredness": 2

}

const severityWeights = {
  mild:2,
  moderate:5,
  severe:10
}

export const calculatePriority = (data)=>{

  let score = 0

  data.symptoms.forEach(symptom=>{
    if(symptomWeights[symptom]){
      score += symptomWeights[symptom]
    }
  })

  score += severityWeights[data.severity]

  if(data.sinceDays <=2) score +=2
  else if(data.sinceDays<=5) score +=5
  else score +=8

  if(data.previousMedication) score +=4

  return score
}

export const getPriorityLevel = (score)=>{

  if(score >=25) return "critical"
  if(score >=18) return "high"
  if(score >=10) return "medium"

  return "low"
}

export const checkEmergency = (symptoms)=>{

  const emergencySymptoms = [
    "chest pain",
    "breathing issue",
    "unconscious",
    "seizure"
  ]

  for(let s of symptoms){
    if(emergencySymptoms.includes(s)){
      return true
    }
  }

  return false
}