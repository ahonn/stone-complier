import ASTList from './ASTList'
import ASTree from './ASTree'

class BlockStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }
}

export default BlockStmnt