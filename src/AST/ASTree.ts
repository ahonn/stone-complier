abstract class ASTree {
  abstract child(i: number)
  abstract numChildren(): number
  abstract children(): Array<ASTree>
  abstract location(): String
  iterator(): Array<ASTree> {
    return this.children()
  }
}

export default ASTree
