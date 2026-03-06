const symptomWeights = {
  "chest pain":10,
  "breathing issue":9,
  "high fever":7,
  "vomiting":6,
  "dizziness":6,
  "headache":3,
  "cold":2,
  "cough":3
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