const chatInput = document.querySelector(".chat-input textarea"); 
const sendChatbtn = document.querySelector(".chat-input span"); 
const chatbox = document.querySelector(".chatbox"); 
const chatbotToggler = document.querySelector(".chatbot-toggler"); 

let userMessage;
const API_KEY = "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" ;

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${ API_KEY }`
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages : [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messagesElement.textContent = data.choices[0].message.content;
    }).catch((eror) => {
        messagesElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTop(0, chatbox.scrollHeight));
}

const createChatLi = (message, className) =>    {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class = "material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent ;
    return chatLi ;
}

const handleChat = () =>    {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTop(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatbtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));