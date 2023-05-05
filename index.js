const API_KEY = "your_key";
const API_URL = "https://api.openai.com/v1/chat/completions";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");


const generate = async () => {

  if (!promptInput.value) {
    alert("Please enter a prompt.");
    return;
  }
  console.log("haaaiii");

    // Disable the generate button and enable the stop button
    generateBtn.disabled = true;
    // stopBtn.disabled = false;
    resultText.innerText = "Generating...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptInput.value }],
        // max_tokens: 100,
      }),
     // Pass the signal to the fetch request
    });
    
    const data = await response.json();
    console.log(data);
    resultText.innerText = data.choices[0].message.content;
  } catch (error) {
    // if(signal.aborted){

    //   resultText.innerText = "Request aborted"
    // }else{
      
    // }
    console.error("Error", error);
    resultText.innerText = "Error occurred while generating"
  }
};

promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});
generateBtn.addEventListener("click", generate);