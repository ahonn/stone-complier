import Environment from '../Env/Environment'

abstract class ASTree {
  abstract child(i: number)
  abstract numChildren(): number
  abstract children(): Array<ASTree>
  abstract location(): string
  abstract eval(env: Environment): Object
  iterator(): Array<ASTree> {
    return this.children()
  }
}

export default ASTree
