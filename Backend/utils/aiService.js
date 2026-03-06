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

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_KEY}`
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[
{ role:"user", content:prompt }
],
temperature:0.2
})
})

const result = await response.json()

const text = result.choices[0].message.content

return JSON.parse(text)

}