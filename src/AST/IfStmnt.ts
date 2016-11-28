import ASTree from './ASTree'
import ASTList from './ASTList'
import Environment from '../Env/Environment'

class IfStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  condition(): ASTree {
    return this.child(0)
  }

  thenBlock(): ASTree {
    return this.child(1)
  }

  elseBlock(): ASTree {
    return this.numChildren() > 2 ? this.child(2) : null
  }

  toString(): string {
    return "(if " + this.condition() + " " + this.thenBlock() 
            + " else " + this.elseBlock() + ")"
  }

  eval(env: Environment): Object {
    let condition: Object = (<ASTree>this.condition()).eval(env)
    if (condition) {
      return (<ASTree>this.thenBlock()).eval(env)
    } else {
      let b: ASTree = this.elseBlock()
      if (b == null) {
        return 0
      } else {
        return (<ASTree>b).eval(env)
      }
    }
  }
}

export default IfStmnt