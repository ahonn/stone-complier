import ASTree from './ASTree';
import Token from '../Token/Token';

class ASTLeaf extends ASTree {
  private static empty: Array<ASTree> = new Array()
  protected token: Token
  
  constructor(t: Token) {
    super()
    this.token = t
  }

  getToken(): Token {
    return this.token
  }

  child(i: number) {
    throw new Error('IndexOutOfBounds')
  }

  numChildren(): number {
    return 0
  }

  children(): Array<ASTree> {
    return ASTLeaf.empty
  }

  toString(): string {
    return this.token.getText()
  }

  location(): string {
    return "at line " + this.token.getLineNumber()
  }
}

export default ASTLeaf