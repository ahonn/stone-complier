import ASTList from './ASTList'
import ASTree from './ASTree'

class NullStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }
}

export default NullStmnt