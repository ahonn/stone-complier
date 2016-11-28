import ASTree from './ASTree'
import ASTList from './ASTList'
import ASTLeaf from './ASTLeaf'
import NameLiteral from './NameLiteral';
import Environment from '../Env/Environment'

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

  eval(env: Environment): any {
    let op: string = this.operator()
    if (op === "=") {
      let right: Object = (<ASTree>this.right()).eval(env)
      return this.computeAssign(env, right)
    } else {
      let left: Object = (<ASTree>(this.left())).eval(env)
      let right: Object = (<ASTree>(this.right())).eval(env)
      return this.computeOp(left, op, right)
    }
  }

  computeAssign(env: Environment, rvalue: Object) {
    let left: ASTree = this.left()
    if (left instanceof NameLiteral) {
      env.put((<NameLiteral>left).name(), rvalue)
      return rvalue
    } else {
      throw new Error("bad assignment")
    }
  }

  computeOp(left: Object, op: string, right: Object): any {
    if (typeof left === "number" && typeof right === "number") {
      return this.computeNumber(<number>left, op, <number>right)
    } else {
      if (op === "+") {
        return left.toString() + right.toString()
      } else if (op === "==") {
        return left === right
      } else {
        throw new Error("bad type")
      }
    }
  }

  computeNumber(left: number, op: string, right: number): number | boolean {
    let a: number = left
    let b: number = right
    switch(op) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "*":
        return a * b
      case "/":
        return a / b
      case "%":
        return a % b
      case "==":
        return a === b
      case ">":
        return a > b
      case "<":
        return a < b
      default:
        throw new Error("bad operator")
    }
  }
}

export default BinaryExpr