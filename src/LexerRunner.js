const Token = require('./Token/Token.js')
const Lexer = require('./Lexer.js')

class LexerRunner {
  static run(file) {
    let lexer = new Lexer(file)
    let token
    do {
      token = lexer.read()
      console.log("=> " + token.getText())
    } while (lexer.queue.length)
  }
}

module.exports = LexerRunner