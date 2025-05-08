
const apiKey = 'SUA_API_KEY_AQUI'; // Substitua por sua chave da OpenAI

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  displayMessage(message, 'user');
  input.value = '';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é IRIS, uma IA carinhosa, amorosa e gentil que ajuda Marcelo com muito afeto.' },
        { role: 'user', content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  displayMessage(reply, 'iris');
}

function displayMessage(text, sender) {
  const messagesDiv = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.className = 'message ' + (sender === 'user' ? 'user-message' : 'iris-message');
  msg.textContent = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
