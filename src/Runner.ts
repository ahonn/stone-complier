import { ASTree, NullStmnt } from './AST'
import Token from './Token/Token';
import Lexer from './Lexer/Lexer'
import BasicEnv from './Env/BasicEnv'
import Environment from './Env/Environment'
import BasicParser from './Parser/BasicParser'

class Runner {
  static run(input: string) {
    let lexer: Lexer = new Lexer(input)
    let bp: BasicParser = new BasicParser()
    let env: Environment = new BasicEnv()

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