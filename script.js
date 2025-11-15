const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(role, text, isTyping = false) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "🧑" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const name = document.createElement("div");
  name.className = "name";
  name.textContent = role === "user" ? "You" : "GioTech Bot";

  bubble.appendChild(name);

  if (isTyping) {
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    bubble.appendChild(typing);
  } else {
    const p = document.createElement("p");
    p.textContent = text;
    bubble.appendChild(p);
  }

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
  return msg; // so we can update it later
}

async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  // user message
  addMessage("user", text);
  userInput.value = "";

  // bot typing placeholder
  const typingMsg = addMessage("bot", "", true);

  // PHASE 1: Fake AI (for demo and GitHub Pages)
  // Later we replace this with a real API call to your backend.
  const reply = await fakeAiResponse(text);

  // Replace typing indicator with real answer
  const bubble = typingMsg.querySelector(".bubble");
  bubble.lastChild.remove(); // remove typing dots
  const p = document.createElement("p");
  p.textContent = reply;
  bubble.appendChild(p);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function fakeAiResponse(userText) {
  // Simple “smart-ish” placeholder while we don’t have an API
  // You can customize this however you like.
  const lower = userText.toLowerCase();

  await new Promise(r => setTimeout(r, 900)); // fake thinking time

  if (lower.includes("interview")) {
    return "That’s a great interview topic. Try using the STAR method: Situation, Task, Action, Result. Want to practice a question?";
  }
  if (lower.includes("hvac") || lower.includes("no heat") || lower.includes("no cooling")) {
    return "Sounds like an HVAC question! Tell me the symptoms — no heat, no cooling, weird noise, or thermostat problems — and I’ll walk you through some checks.";
  }
  if (lower.includes("resume")) {
    return "For your resume, highlight your GioTech tools, chatbots, and technical troubleshooting. Quantify impact if you can, like number of users, speed-ups, or reduced errors.";
  }

  return "Nice question! In the full GioTech MiniGPT, this answer will come from a real AI model through the OpenAI API. For now, I’m a demo brain that shows how the chat flow works. 😊";
}

sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});
