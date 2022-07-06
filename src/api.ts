import axios from 'axios'
import path from 'path'
import { createHash } from 'crypto'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '../.env') })

export const trans = async (word: string = 'welcome') => {
  const baseurl: string = process.env.BAIDU_API!
  const appid: string = process.env.APP_ID!
  const secretkey: string = process.env.APP_SECRET!
  const salt = Math.random()
  const sign = createHash('md5')
    .update(appid + word + salt + secretkey)
    .digest('hex')

  let from, to
  if (/[a-zA-Z]/.test(word[0])) {
    ;[from, to] = ['en', 'zh']
  } else {
    ;[from, to] = ['zh', 'en']
  }

  const data = await axios.get('', {
    baseURL: baseurl,
    params: { q: word, from, to, appid, salt, sign }
  })

  return data.data.trans_result[0]
}
