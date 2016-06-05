import smtplib
import email.message

host = 'smtp.gmail.com'
user = 'shpindler.ar@gmail.com'
pswd = 'trukrOs72'

addr_from = 'shpindler.ar@gmail.com'
addr_to = 'ftrplst@ya.ru'
subj = 'Тест'
text = 'Текст.'

msg = email.message.Message()
msg['from'] = addr_from
msg['to'] = addr_to
msg['subject'] = subj
msg.set_payload(text, 'utf-8')

con = smtplib.SMTP_SSL(host)
con.login(user, pswd)
con.send_message(msg)
con.quit()
