import { sendMessage } from "@/utils/telegram";
import { sendPhoto } from "@/utils/telegram";

export default async function handler(req, res) {
  console.log('hello');
  if (req.method=="POST") {
    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;
    console.log("ChatID", chatId);
    console.log("text", text);
    
    if (text == "meow") {
      const apiUrl = 'https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg&format=json&limit=1';
      
      // Make a GET request
      fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
          if (response.status === 404) {
              throw new Error('Data not found');
          } else if (response.status === 500) {
              throw new Error('Server error');
          } else {
              throw new Error('Network response was not ok');
          }
          }
          return response.json();
      })
      .then(data => {
          console.log(data[0]['url']);
          var pic = data[0]['url'];
          console.log(pic);
          sendPhoto(chatId, pic, text);
          res.status(200).send("OK");
      })
      .catch(error => {
          console.error('Error:', error);
      });
  

    } else {
      await sendMessage(chatId,text);
    }
            

    res.status(200).send("OK")


  } else {
      res.setHeader('Allow', ['POST']);
      res.status(500).send('Method Not Allowed');
  }
}