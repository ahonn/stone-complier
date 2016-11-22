const fs = require('fs')

const Token = require('./Token//Token.js')
const IdToken = require('./Token/IdToken.js')
const NumToken = require('./Token/NumToken.js')
const StrToken = require('./Token/StrToken.js')

class Lexer {
  constructor(input) {
    this.queue = []
    this.hasMore = true
    this.reader = fs.readFileSync(input, 'utf-8')
    this.regexPat 
      = /\s*((\/\/.*)|(\d+)|(\"(\\\\\"|\\\\\\\\|\\\\n|[^\"])*\")|[A-Z_a-z]\w*|==|<=|>=|&&|\|\||[^\w\s\n\t]?)/g
  }

  isComments(text) {
    let re = /^\/\/.*/g
    return re.test(text)
  }

  isNumber(text) {
    let re = /^\d+/g
    return re.test(text)
  }

  isString(text) {
    let re = /^\"(\\\\\"|\\\\\\\\|\\\\n|[^\"])*\"/g
    return re.test(text)
  }

  isIdentifier(text) {
    let re = /^[A-Z_a-z]\w*|==|<=|>=|&&|\|\||[^\w\s\n\t]?/g
    return re.test(text)
  }

  read() {
    if (this.fillQueue(0)) {
      return this.queue.shift()
    }
    return Token.EOF
  }

  peek(i) {
    if (this.fillQueue(i)) {
      return this.queue[i]
    }
    return Token.EOF
  }

  fillQueue(i) {
    if (i >= this.queue.length) {
      if (this.hasMore) {
        this.readLine()
      } else {
        return false
      }
    }
    return true
  }

  readLine() {
    let lines = this.reader.split('\n')
    lines.map((line, lineNo) => {
      let matcher = line.match(this.regexPat)

      lineNo += 1
      this.addToken(lineNo, matcher)
      this.queue.push(new IdToken(lineNo, Token.EOL))
    })

    this.hasMore = false
  }

  addToken(lineNo, matcher) {
    while (matcher.length) {
      let text = matcher.shift().trim()
      if (text && !this.isComments(text)) {
        let token
        if (this.isNumber(text)) {
          token = new NumToken(lineNo, parseInt(text))
        } else if (this.isString(text)) {
          token = new StrToken(lineNo, text)
        } else if (this.isIdentifier(text)) {
          token = new IdToken(lineNo, text)
        } 
        
        this.queue.push(token)
      }
    }
  } 
}

module.exports = Lexer
