import fetch from "node-fetch"

export const getAIRecommendation = async(data)=>{

const prompt = `
You are a medical assistant helping doctors evaluate patient symptoms.

Patient Details:
Symptoms: ${data.symptoms.join(", ")}
Severity: ${data.severity}
Since Days: ${data.sinceDays}
Previous Medication: ${data.medicationsTaken}

Medical Safety Rules:
- Only suggest common over-the-counter medicines.
- Do not prescribe antibiotics unless clearly required.
- Do not suggest controlled or dangerous medications.
- This recommendation is only assistive for doctors, not a final prescription.

Return ONLY valid JSON in this format:

{
"medicines": [],
"reasons": [],
"sideEffects": [],
"precautions": [],
"confidence": 0.0
}
`

const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
  role:"user",
  parts:[
    { text:prompt }
  ]
}
],
generationConfig:{
temperature:0.2
}
})
})

const result = await response.json()

if(!response.ok){
  console.error("Gemini API Error:",result)
  throw new Error(result.error?.message || "Gemini API request failed")
}

if(!result.candidates || !result.candidates[0]){
  console.error("Invalid Gemini response:",result)
  throw new Error("No candidates in Gemini response")
}

const text = result.candidates[0].content.parts[0].text

// Extract JSON from markdown code blocks if present
let jsonText = text
const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
if(jsonMatch){
  jsonText = jsonMatch[1].trim()
}

return JSON.parse(jsonText)

}