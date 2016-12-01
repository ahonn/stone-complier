import ASTree from './ASTree'
import ASTLeaf from './ASTLeaf'
import ASTList from './ASTList'
import Environment from '../Env/Environment'

class ParameterList extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  name(i: number): string {
    return (<ASTLeaf>this.child(i)).getToken().getText()
  }

  size(): number {
    return this.numChildren()
  }

  eval(env: Environment, value: Object, index: number): any {
    env.putNew(this.name(index), value)
  }
}

export default ParameterList