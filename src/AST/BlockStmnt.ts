import ASTree from './ASTree'
import ASTList from './ASTList'
import NullStmnt from './NullStmnt'
import Environment from '../Env/Environment'

class BlockStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  eval(env: Environment): Object {
    let result: Object = 0
    for (let t of this.childrens) {
      if (!(t instanceof NullStmnt)) {
        // Maybe Bug
        result = (<ASTree>t).eval(env)
      }
    }
    return result
  }
}

export default BlockStmnt