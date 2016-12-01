import Token from '../Token/Token'
import Lexer from '../Lexer/Lexer'
import ASTree from '../AST/ASTree';
import FuncParser from './FuncParser'

class ParserRunner {
  static run(input: string): void {
    let lexer: Lexer = new Lexer(input)
    let bp: FuncParser = new FuncParser()

    while (lexer.peek(0) != Token.EOF) {
      let ast: ASTree = bp.parse(lexer)
      console.log("=> " + ast.toString())
    }
  }
}

export default ParserRunner