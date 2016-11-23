import Lexer from './Lexer';
import Token from '../Token/Token';

class LexerRunner {
  static run(input: string) {
    let lexer: Lexer = new Lexer(input)
    for(let token: Token; (token = lexer.read()) != Token.EOF; ) {
      console.log("=> " + token.getText())
    }
  }
}

export default LexerRunner