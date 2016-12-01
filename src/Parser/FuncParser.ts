import {
  DefStmnt,
  Arguments,
  PrimaryExpr,
  NameLiteral,
  ParameterList
} from '../AST'
import Parser from './Parser'
import BasicParser from './BasicParser'

const rule = Parser.rule

class FuncParser extends BasicParser {
  param: Parser = rule().identifier(this.reserved, NameLiteral)
  params: Parser = rule(PrimaryExpr).ast(this.param).repeat(rule().sep(",").ast(this.param))
  paramList: Parser = rule(ParameterList).sep("(").maybe(this.params).sep(")")
  def: Parser = rule(DefStmnt).sep("def")
                  .identifier(this.reserved, NameLiteral)
                  .ast(this.paramList)
                  .ast(this.block)

  args: Parser = rule(Arguments).ast(this.expr).repeat(rule().sep(",").ast(this.expr))
  postfix: Parser = rule().sep("(").maybe(this.args).sep(")")

  constructor() {
    super()
    this.reserved.add(")")
    this.primary.repeat(this.postfix)
    this.simple.option(this.args)
    this.program.insertChoice(this.def)
  }
}

export default FuncParser