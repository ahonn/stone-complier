import { ASTree, NullStmnt } from './AST'
import Token from './Token/Token';
import Lexer from './Lexer/Lexer'
import NestedEnv from './Env/NestedEnv'
import Environment from './Env/Environment'
import FuncParser from './Parser/FuncParser'

class Runner {
  static run(input: string) {
    let lexer: Lexer = new Lexer(input)
    let bp: FuncParser = new FuncParser()
    let env: Environment = new NestedEnv()

    while (lexer.peek(0) != Token.EOF) {
      let t: ASTree = bp.parse(lexer)
      if (!(t instanceof NullStmnt)) {
        let r: Object = t.eval(env)
        console.log("=> " + r)
      }
    }
  }
}

export default Runner