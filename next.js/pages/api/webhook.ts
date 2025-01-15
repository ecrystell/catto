// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sendMessage } from "@/utils/telegram";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    console.log("Body", req.body);
    const chatid = req.body.message.chat.id;
    const text = req.body.message.text;

    console.log("chatid", chatid);
    console.log("text", text);
    await sendMessage(chatid, text);
    res.status(200).send("OK");
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(500).send("Method Not Allowed")
  }
}
