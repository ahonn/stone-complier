import ASTList from './ASTList'
import ASTree from './ASTree'
import Postfix from './Postfix'
import Environment from '../Env/Environment'

class PrimaryExpr extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  static create(c: Array<ASTree>) {
    return c.length === 1 ? c[0] : new PrimaryExpr(c)
  }

  operand(): ASTree {
    return this.child(0)
  }

  size(): number {
    return this.numChildren()
  }

  postfix(nest: number): Postfix {
    return <Postfix>this.child(this.numChildren() - nest - 1)
  }

  hasPostfix(nest: number): boolean {
    return this.numChildren() - nest > 1
  }

  eval(env: Environment): Object {
    return this.evalSubExpr(env, 0)
  }

  evalSubExpr(env: Environment, nest: number): Object {
    if (this.hasPostfix(nest)) {
      let target: Object = this.evalSubExpr(env, nest + 1)
      return (<Postfix>this.postfix(nest)).eval(env, target)
    } else {
      return this.operand().eval(env)
    }
  }
}

export default PrimaryExpr