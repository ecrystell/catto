import { sendPhoto } from "@/utils/telegram";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    //if (req.method == "POST") {
    const chatId = "@cattobotto";
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg&format=json&limit=1';
    
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data[0]['url'])
    var pic = data[0]['url'];
    console.log(pic);
    await sendPhoto(chatId, pic, " ");
    return new Response(`cat picture sent hopefully`);

    
}