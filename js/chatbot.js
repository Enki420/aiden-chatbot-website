document.getElementById('chatbot-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const input = event.target.value;
        if (input.trim()) {
            addMessageToChat('You', input);
            event.target.value = '';
            setTimeout(() => {
                addMessageToChat('AIDEN', 'Processing your request...');
            }, 1000);
        }
    }
});

function addMessageToChat(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('mb-2');
    messageContainer.innerHTML = `<strong>${sender}:</strong> ${message}`;
    document.getElementById('chatbot-messages').appendChild(messageContainer);
}
