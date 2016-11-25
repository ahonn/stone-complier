import ASTree from './ASTree';
import ASTList from './ASTList';
import ASTLeaf from './ASTLeaf';

class BinaryExpr extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  left(): ASTree {
    return this.child(0)
  }

  operator(): string {
    return (<ASTLeaf>this.child(1)).getToken().getText()
  }

  right(): ASTree {
    return this.child(2)
  }
}

export default BinaryExpr