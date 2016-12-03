import Token from '../Token/Token'
import Lexer from '../Lexer/Lexer'
import ASTree from '../AST/ASTree';
import ClosureParser from './ClosureParser'

class ParserRunner {
  static run(input: string): void {
    let lexer: Lexer = new Lexer(input)
    let bp: ClosureParser = new ClosureParser()

    while (lexer.peek(0) != Token.EOF) {
      let ast: ASTree = bp.parse(lexer)
      console.log("=> " + ast.toString())
    }
  }
}

export default ParserRunner