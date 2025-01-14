import requests
import os
from keepalive import keep_alive
from telegram.ext import Updater, CommandHandler
import datetime
from beemovie import beemovie



my_secret = os.environ['TOKEN']

def linecount(splitscript):
    with open("count.txt", 'r') as f:
        count = int(f.read())
    with open("count.txt", 'w') as f:
        if count == len(splitscript):
            f.write("0")
        else:
            f.write(str(count+1))
    return count

def generatecaption():
    script = beemovie()
    splitscript = script.split('\n\n')
    
    count = linecount(splitscript)
    result = splitscript[count]
    
    return result
    

def telegram_bot_pic(bot):
    #contents = requests.get('https://api.thecatapi.com/v1/images/search').json()    
    #url = contents[0]['url']
    contents = requests.get('https://cataas.com/cat?type=sm&json=true').json() 
    url = 'https://cataas.com' + contents['url'] 
    bot_chatID = '@cattobotto'
    caption = generatecaption()
    
    bot.bot.sendPhoto(chat_id = bot_chatID, photo=url, caption=caption)
    print(url + ' sent')


def start(update, bot):
    htext = '''Send /cat for a random cat pic or join                                 https://t.me/cattobotto for daily cat pics'''
    chatid = update.message.chat_id
    bot.bot.sendMessage(chat_id = chatid, text = htext)
    print('help sent')

def cat(update, bot):
    contents = requests.get('https://cataas.com/cat?type=sm&json=true').json() 
    url = 'https://cataas.com' + contents['url'] 
    chatid = update.message.chat_id
    bot.bot.sendPhoto(chat_id = chatid, photo = url)
    print('cat sent')

    
def main():
    updater = Updater(my_secret)
    dp = updater.dispatcher
    #schedule.run_pending()
    j = updater.job_queue
    j.run_daily(telegram_bot_pic, days=(0,1,2,3,4,5,6), time= datetime.time(hour=23, minute=00, second=00))
   # j.run_daily(telegram_bot_pic, days=(0,1,2,3,4,5,6), time= datetime.time(hour=1, minute=43, second=00))
    
    dp.add_handler(CommandHandler('cat', cat))
    dp.add_handler(CommandHandler('help', start))
    dp.add_handler(CommandHandler('start', start))
    updater.start_polling()
    updater.idle()

    
#schedule.every().day.at("08:00").do(catpic)
#schedule.every().minute.do(catpic)

keep_alive()
if __name__ == '__main__':
    main()

    