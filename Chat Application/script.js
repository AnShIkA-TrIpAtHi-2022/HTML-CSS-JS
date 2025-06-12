// Chat message handling for real-time chat UI
const chatWindow = document.getElementById('chat-window');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const userList = document.getElementById('user-list');
const userListSection = document.getElementById('user-list-section');
const toggleUsersBtn = document.getElementById('toggle-users');

function appendMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message';
    msgDiv.innerHTML = `<span class="msg-text">${text}</span>`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (text) {
        appendMessage(text);
        messageInput.value = '';
        messageInput.focus();
    }
});

messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        messageForm.dispatchEvent(new Event('submit', { cancelable: true }));
    }
    // Shift+Enter will insert a new line by default, so no need to handle it
});

// Make user list items clickable (for demo, highlight on click)
userList.addEventListener('click', function(e) {
    if (e.target.classList.contains('user')) {
        document.querySelectorAll('.user').forEach(u => u.classList.remove('selected'));
        e.target.classList.add('selected');
        // Update chat user header
        const chatUserHeader = document.getElementById('chat-user-header');
        chatUserHeader.textContent = e.target.textContent.trim();
    }
});

if (toggleUsersBtn) {
    toggleUsersBtn.addEventListener('click', function() {
        userListSection.classList.toggle('collapsed');
    });
}