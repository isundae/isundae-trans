import { exec } from 'child_process'
import { trans } from './api'
import { Command } from 'commander'
import 'dotenv/config'
import 'console-color-mr'

const CMD = new Command()

CMD.version('0.0.1')
  .name('命令行翻译工具 [trans]    --by:isundae.cn')
  .usage('<必填参数：汉语或英文单词>')
  .arguments('[word]')
  .action(async (word: string = 'hello') => {
    const { src, dst } = await trans(word)
    console.log()
    console.info(`---------------------`)
    console.info(` ✨ ${src} -> ${dst} ✨`)
    console.info(
      `---------------------
    `
    )
    exec(`<nul (set/p z=${dst}) | clip`)
  })
  .parse(process.argv)
