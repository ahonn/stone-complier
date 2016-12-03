import { Closure } from '../AST';
import Parser from './Parser'
import FuncParser from './FuncParser'

const rule = Parser.rule

class ClosureParser extends FuncParser {
  constructor() {
    super()
    this.primary.insertChoice(rule(Closure).sep("fun").ast(this.paramList).ast(this.block))
  }
}

export default ClosureParser