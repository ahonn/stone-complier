import ASTree from './ASTree'
import ASTLeaf from './ASTLeaf'
import ASTList from './ASTList'
import Environment from '../Env/Environment';
import ParameterList from './ParameterList'
import BlockStmnt from './BlockStmnt'
import Functions from './Functions';

class DefStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  name(): string {
    return (<ASTLeaf>this.child(0)).getToken().getText()
  }

  parameters(): ParameterList {
    return <ParameterList>this.child(1)
  }

  body(): BlockStmnt {
    return <BlockStmnt>this.child(2)
  }

  eval(env: Environment): Object {
    env.putNew(this.name(), new Functions(this.parameters(), this.body(), env))
    return this.name()  
  }

  toString(): string {
    return "(def " + this.name() + " " + this.parameters() + " " + this.body() +  ")"
  }
}

export default DefStmnt