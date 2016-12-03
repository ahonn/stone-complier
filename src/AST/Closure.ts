import ASTree from './ASTree'
import ASTList from './ASTList'
import Functions from './Functions';
import BlockStmnt from './BlockStmnt'
import ParameterList from './ParameterList'
import Environment from '../Env/Environment'
import NestedEnv from '../Env/NestedEnv'

class Closure extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  paramters(): ParameterList {
    return <ParameterList>this.child(0)
  }

  body(): BlockStmnt {
    return <BlockStmnt>this.child(1)
  }

  toString(): string {
    return "(fun " + this.paramters() + " " + this.body() + ")"
  }

  eval(env: Environment): Object {
    return new Functions(this.paramters(), this.body(), env)
  }
}

export default Closure