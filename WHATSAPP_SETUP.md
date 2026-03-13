# WhatsApp Floating Button - Setup Guide

## Overview
A floating WhatsApp button has been added to all pages of your portfolio website. It includes:
- ✅ Floating button in the bottom-right corner
- ✅ Interactive chat popup with automated replies
- ✅ Automatic message sending to WhatsApp
- ✅ Responsive design for mobile and desktop
- ✅ Smooth animations and transitions

## Files Added/Modified

### New Files:
1. **whatsapp.js** - JavaScript functionality for the button and chat
2. **WHATSAPP_SETUP.md** - This guide

### Modified Files:
- **style.css** - Added WhatsApp button styling
- **index.html** - Added whatsapp.js script
- **about.html** - Added whatsapp.js script
- **services.html** - Added whatsapp.js script
- **portfolio.html** - Added whatsapp.js script
- **contact.html** - Added whatsapp.js script

## Configuration

### 1. Update Your WhatsApp Number
Open `whatsapp.js` and find this line (near the top):

```javascript
const WHATSAPP_NUMBER = '254785121254'; 
```

Replace `254785121254` with your actual WhatsApp number in international format:
- **Format:** Country code + Full number (without + or spaces)
- **Example:** For +254 785 121 254, use `254785121254`
- **Common country codes:**
  - Kenya: 254
  - United States: 1
  - United Kingdom: 44
  - India: 91

### 2. Update Business Name (Optional)
On the same file, find:

```javascript
const BUSINESS_NAME = 'Kkass Tech';
```

Change `'Kkass Tech'` to your business name.

### 3. Customize Automated Replies
Still in `whatsapp.js`, find the `autoReplies` array:

```javascript
const autoReplies = [
    "Hello! 👋 Thanks for reaching out!",
    "Welcome to ${BUSINESS_NAME}. How can I help you today?",
    "I'm currently away, but I'll get back to you ASAP! 📲"
];
```

Change these messages to your preferred automated responses. You can:
- Add more messages (they'll be randomly selected)
- Use emojis
- Use `${BUSINESS_NAME}` placeholder (it will be replaced automatically)

### Example Custom Replies:
```javascript
const autoReplies = [
    "Hey 👋 Thanks for reaching out!",
    "I'm here to help with your web development needs! 💻",
    "How can I assist you today?",
    "Currently away but I'll respond within 24 hours! ⏱️"
];
```

## Features

### What Happens When User Clicks:
1. **Click WhatsApp Button** → Popup opens with greeting
2. **User Types Message** → Appears in chat
3. **Bot Sends Auto-Reply** → Automated response shows
4. **After Delay** → User is redirected to WhatsApp Web
5. **On WhatsApp** → Message is pre-filled and ready to send

### Mobile Responsiveness
The button automatically adjusts for smaller screens:
- Button becomes slightly smaller on mobile
- Chat popup takes 90% of screen width on mobile
- Optimized for touchscreen interaction

## Styling

### Button Colors
The WhatsApp button uses a green gradient:
- Primary: `#25d366` (WhatsApp green)
- Secondary: `#128c7e` (Darker green)

To change colors, edit these in `style.css`:
```css
.whatsapp-button {
    background: linear-gradient(135deg, #25d366, #128c7e);
}

.whatsapp-header {
    background: linear-gradient(135deg, #25d366, #128c7e);
}

.whatsapp-send-btn {
    background: #25d366;
}

.whatsapp-send-btn:hover {
    background: #128c7e;
}
```

Replace the hex colors with your preferred colors.

## Browser Compatibility
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Troubleshooting

### Button Not Appearing?
1. Check that `whatsapp.js` is in the same directory as your HTML files
2. Ensure the script tag is added before `</body>` in the HTML
3. Check browser console for JavaScript errors (F12 → Console)

### Messages Not Sending to WhatsApp?
1. Verify the WhatsApp number is in correct international format
2. Make sure the number is a valid WhatsApp account
3. Check that the popups aren't blocked by browser settings

### Styling Issues?
1. Verify `style.css` was updated correctly
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check for CSS conflicts with existing styles

## Advanced Customization

### Change Button Position
In `style.css`, modify `.whatsapp-button`:
```css
.whatsapp-button {
    bottom: 50px;  /* Distance from bottom (default: 30px) */
    right: 50px;   /* Distance from right (default: 30px) */
}
```

### Change Animation Speed
Modify the animation duration:
```css
.whatsapp-button {
    animation: slideIn 0.5s ease-out;  /* Change 0.5s to desired duration */
}
```

### Add More Auto-Reply Logic
You can modify the `sendMessage()` function in `whatsapp.js` to add intelligent responses based on keywords:

```javascript
function sendMessage() {
    const message = input.value.trim();
    
    if (message === '') return;

    addUserMessage(message);
    input.value = '';
    input.focus();

    // Custom logic based on message content
    let reply = "Thanks for your message!";
    if (message.toLowerCase().includes('price')) {
        reply = "Please contact me for detailed pricing!";
    } else if (message.toLowerCase().includes('project')) {
        reply = "I'd love to discuss your project!";
    }

    setTimeout(() => {
        addBotMessage(reply);
    }, 500);

    setTimeout(() => {
        sendToWhatsApp(message);
    }, 2000);
}
```

## Support
If you need to modify or debug the WhatsApp button functionality, check:
- Browser Developer Tools Console (F12)
- JavaScript console errors
- Network tab for API calls

---

**Note:** This feature requires JavaScript to be enabled in the browser.
