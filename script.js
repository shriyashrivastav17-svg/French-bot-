// Wait until the website is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the HTML elements we need
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Function to add a message to the chat window
    function addMessage(text, sender) {
        // Create a new 'div' element for the message
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = text;

        // Add the new message to the chat window
        chatMessages.appendChild(messageElement);

        // Automatically scroll to the bottom to see the new message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle sending a message
    function handleSendMessage() {
        const text = userInput.value.trim(); // Get text from input, remove whitespace

        if (text) {
            // 1. Add the user's message to the UI
            addMessage(text, 'user');
            
            // 2. Clear the input box
            userInput.value = '';

            // 3. Get a response from the bot (currently a "dummy" response)
            // We use a small delay to make it feel like the bot is "thinking"
            setTimeout(() => {
                getBotResponse(text);
            }, 1000);
        }
    }

    // --- THIS IS THE MOST IMPORTANT PART ---
    // This function is where you will connect your *real* AI.
    // For now, it's just a "dummy" function with pre-written answers.
    function getBotResponse(userText) {
        let botResponse = "Je ne suis pas sûr de comprendre. Pourriez-vous reformuler?";

        // Simple pre-programmed rules
        const lowerCaseText = userText.toLowerCase();

        if (lowerCaseText.includes("président")) {
            botResponse = "Le président de la République française est le chef de l'État. Actuellement, c'est Emmanuel Macron.";
        } else if (lowerCaseText.includes("cinquième république") || lowerCaseText.includes("fifth republic")) {
            botResponse = "La Cinquième République est le système de gouvernement républicain actuel en France. Elle a été établie par Charles de Gaulle en 1958.";
        } else if (lowerCaseText.includes("bonjour") || lowerCaseText.includes("salut")) {
            botResponse = "Bonjour! Comment puis-je vous aider avec la politique française aujourd'hui?";
        }

        // Add the bot's response to the UI
        addMessage(botResponse, 'bot');
    }

    // --- How to connect a REAL AI (Example) ---
    /*
    async function getRealBotResponse(userText) {
        // This is a FAKE example of calling an AI API
        const api_endpoint = "https://your-ai-bot-service.com/api/chat";

        const response = await fetch(api_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userText })
        });

        const data = await response.json();
        const botResponse = data.answer; // Assuming the AI returns { "answer": "..." }

        addMessage(botResponse, 'bot');
    }
    // You would then call getRealBotResponse(text) instead of getBotResponse(text)
    */


    // --- Event Listeners ---

    // Send message when the "Envoyer" button is clicked
    sendBtn.addEventListener('click', handleSendMessage);

    // Send message when the "Enter" key is pressed in the input field
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

});
