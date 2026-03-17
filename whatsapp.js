// WhatsApp Button Configuration
const WHATSAPP_NUMBER = '254785121254'; // Replace with your WhatsApp number (country code + number)
const BUSINESS_NAME = 'Kkass Tech';

// Auto-reply messages
const autoReplies = [
    "Hello! 👋 Thanks for reaching out!",
    `Welcome to ${BUSINESS_NAME}. How can I help you today?`,
    "I'm currently away, but I'll get back to you ASAP! 📲"
];

// Initialize WhatsApp button
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButton();
});

function initWhatsAppButton() {
    // Check if button already exists (in case of dynamic page load)
    if (document.getElementById('whatsapp-button-container')) {
        return;
    }

    // Create button HTML
    const buttonHTML = `
        <div id="whatsapp-button-container">
            <button class="whatsapp-button" id="whatsapp-btn" title="Chat on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
            </button>
            
            <div class="whatsapp-popup" id="whatsapp-popup">
                <div class="whatsapp-header">
                    <h3>${BUSINESS_NAME}</h3>
                    <button class="whatsapp-close" id="whatsapp-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="whatsapp-content" id="whatsapp-content">
                    <!-- Messages will be added here -->
                </div>
                <div class="whatsapp-input-area">
                    <input 
                        type="text" 
                        id="whatsapp-input" 
                        placeholder="Type your message..." 
                        autocomplete="off"
                    >
                    <button class="whatsapp-send-btn" id="whatsapp-send">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add button to body
    document.body.insertAdjacentHTML('beforeend', buttonHTML);

    // Get elements
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const closeBtn = document.getElementById('whatsapp-close');
    const sendBtn = document.getElementById('whatsapp-send');
    const input = document.getElementById('whatsapp-input');
    const content = document.getElementById('whatsapp-content');

    // Toggle popup
    whatsappBtn.addEventListener('click', () => {
        whatsappPopup.classList.toggle('active');
        if (whatsappPopup.classList.contains('active')) {
            // Show greeting message
            if (content.children.length === 0) {
                addBotMessage(autoReplies[0]);
                setTimeout(() => {
                    addBotMessage(autoReplies[1]);
                }, 800);
            }
            input.focus();
        }
    });

    // Close popup
    closeBtn.addEventListener('click', () => {
        whatsappPopup.classList.remove('active');
    });

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = input.value.trim();
        
        if (message === '') return;

        // Add user message
        addUserMessage(message);
        
        // Clear input
        input.value = '';
        input.focus();

        // Simulate bot response
        setTimeout(() => {
            const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
            addBotMessage(randomReply);
        }, 500);

        // Send to WhatsApp after 2 seconds
        setTimeout(() => {
            sendToWhatsApp(message);
        }, 2000);
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'whatsapp-message user';
        messageDiv.innerHTML = `<div class="whatsapp-message-bubble">${escapeHtml(text)}</div>`;
        content.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'whatsapp-message bot';
        messageDiv.innerHTML = `<div class="whatsapp-message-bubble">${escapeHtml(text)}</div>`;
        content.appendChild(messageDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        content.scrollTop = content.scrollHeight;
    }

    function sendToWhatsApp(message) {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}
