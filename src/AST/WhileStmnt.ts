import ASTree from './ASTree'
import ASTList from './ASTList'
import Environment from '../Env/Environment'

class WhileStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  condition(): ASTree {
    return this.child(0)
  }

  body(): ASTree {
    return this.child(1)
  }

  toString(): string {
    return "(while " + this.condition() + " " + this.body() + ")"
  }

  eval(env: Environment): Object {
    let result: Object = 0
    while(1) {
      let condition: Object = (<ASTree>this.condition()).eval(env)
      if (! condition) {
        return result
      } else {
        result = (<ASTree>this.body()).eval(env)
      }
    }
  }
}

export default WhileStmnt