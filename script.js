document.addEventListener('DOMContentLoaded', () => {

    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            userInput.value = '';
            
            // This is the only part that changes
            // We now call our real AI brain
            getBotResponse(text);
        }
    }

    // --- THIS IS THE NEW "BRAIN" FUNCTION ---
    // It calls your Netlify serverless function
    async function getBotResponse(userText) {
        // Show a "typing" indicator
        addMessage("...", 'bot');

        try {
            // Send the user's text to our new serverless function
            const response = await fetch('/.netlify/functions/ask-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userText }) // Send the text as JSON
            });

            // Remove the "typing..." message
            chatMessages.removeChild(chatMessages.lastChild);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            addMessage(data.answer, 'bot'); // Add the AI's real answer

        } catch (error) {
            // Remove the "typing..." message if an error occurs
            if (chatMessages.lastChild.textContent === "...") {
                chatMessages.removeChild(chatMessages.lastChild);
            }
            console.error("Error fetching from server:", error);
            addMessage("I'm experiencing a connection issue. Please try again.", 'bot');
        }
    }
    // --- END OF NEW FUNCTION ---

    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });
});
