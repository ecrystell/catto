// msg, chatd
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TOKEN}`

export async function sendMessage(chatid, text) {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatid,
                text: text
            })
        })
        if (!response.ok){
            console.log("Failed to send message to telegram user", await response.text());
        }
    } catch (err) {
        console.log("Error occured while sending message to telegram user", err);
    }
}

export async function sendPhoto(chatid, pic, caption) {
    const url = `${TELEGRAM_API_URL}/sendPhoto`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatid,
                photo: pic,
                caption: caption
            })
        })
        if (!response.ok){
            console.log("Failed to send photo to telegram user", await response.text());
        }
    } catch (err) {
        console.log("Error occured while sending photo to telegram user", err);
    }
}