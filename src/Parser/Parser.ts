// import { Set } from 'typescript-collections'
import Token from '../Token/Token'
import Lexer from '../Lexer/Lexer'
import { ASTree, ASTList, ASTLeaf } from '../AST'

export default class Parser {
  protected elements: Array<Element>
  protected factory: Factory

  constructor(p: Parser) {
    if (p instanceof Parser) {
      this.elements = p.elements
      this.factory = p.factory
    } else {
      this.reset(null)
    }
  }

  parse(lexer: Lexer): ASTree {
    let results: Array<ASTree> = new Array()
    for (let e of this.elements) {
      e.parse(lexer, results)
    }
    return this.factory.make(results)
  }

  match(lexer: Lexer): boolean {
    if (this.elements.length === 0) {
      return true
    } else {
      let e: Element = this.elements[0]
      return e.match(lexer)
    }
  }

  static rule(clazz: any = null): Parser {
    return new Parser(clazz)
  }

  reset(clazz: any = undefined): Parser {
    this.elements = new Array()
    if (clazz !== undefined) {
      this.factory = Factory.getForASTList(clazz)
    }
    return this
  }

  number(clazz: any = null): Parser {
    this.elements.push(new NumToken(clazz))
    return this
  }

  identifier(reserved: Set<string>, clazz: any): Parser {
    this.elements.push(new IdToken(clazz, reserved))
    return this
  }

  string(clazz: any = null): Parser {
    this.elements.push(new StrToken(clazz))
    return this
  }

  token(...pat: string[]) {
    this.elements.push(new Leaf(pat))
    return this
  }

  sep(...pat: string[]): Parser {
    this.elements.push(new Skip(pat))
    return this
  }

  ast(p: Parser): Parser {
    this.elements.push(new Tree(p))
    return this
  }

  or(...p: Parser[]): Parser {
    this.elements.push(new OrTree(p))
    return this
  }

  maybe(p: Parser): Parser {
    let p2: Parser = new Parser(p)
    p2.reset();
    // Unknow right
    this.elements.push(new OrTree(new Array<Parser>(p, p2)))
    return this
  }

  option(p: Parser): Parser {
    this.elements.push(new Repeat(p, true))
    return this
  }

  repeat(p: Parser): Parser {
    this.elements.push(new Repeat(p, false))
    return this
  }

  expresson(subexp: Parser, operators: Operators, clazz: any = null): Parser {
    this.elements.push(new Expr(clazz, subexp, operators))
    return this
  }

  insertChoice(p: Parser) {
    let e: Element = this.elements[0]
    if (e instanceof OrTree) {
      (<OrTree>e).insert(p)
    } else {
      let otherwise: Parser = new Parser(this)
      this.reset()
      this.or(p, otherwise)
    }
    return this
  }
}

abstract class Element {
  abstract parse(lexer: Lexer, res: Array<ASTree>): void
  abstract match(lexer: Lexer): boolean  
}

export class Tree extends Element {
  protected parser: Parser

  constructor(p: Parser) {
    super()
    this.parser = p
  }

  parse(lexer: Lexer, res: Array<ASTree>): void {
    res.push(this.parser.parse(lexer))
  }

  match(lexer: Lexer): boolean {
    return this.parser.match(lexer)
  }
}

export class OrTree extends Element {
  protected parsers: Parser[]

  constructor(p: Parser[]) {
    super()
    this.parsers = p
  }

  parse(lexer: Lexer, res: Array<ASTree>): void {
    let p: Parser = this.choose(lexer)
    if (p === null) {
      // TODO
      throw new Error('OrTree.parse')
    } else {
      res.push(p.parse(lexer))
    }
  }

  match(lexer: Lexer): boolean {
    return this.choose(lexer) !== null
  }

  choose(lexer: Lexer): Parser {
    for(let p of this.parsers) {
      if(p.match(lexer)) {
        return p
      }
    }
    return null
  }

  insert(p: Parser): void {
    this.parsers.unshift(p)
  }
}

export class Repeat extends Element {
  protected parser: Parser
  protected onlyOnce: boolean

  constructor(p: Parser, once: boolean) {
    super()
    this.parser = p
    this.onlyOnce = once
  }

  parse(lexer: Lexer, res: Array<ASTree>): void {
    while(this.parser.match(lexer)) {
      let t: ASTree = this.parser.parse(lexer)
      if (t.constructor.name != ASTList.name || t.numChildren() > 0) {
        res.push(t)
      }
      if (this.onlyOnce) {
        break
      }
    }
  }

  match(lexer: Lexer): boolean {
    return this.parser.match(lexer)
  }
}

abstract class AToken extends Element {
  protected factory: Factory

  constructor(type: any) {
    super()
    if (type === undefined) {
      type = ASTList.name
    }
    this.factory = Factory.get(type)
  }

  parse(lexer: Lexer, res: Array<ASTree>): void {
    let t: Token = lexer.read()
    if (this.test(t)) {
      let leaf: ASTree = this.factory.make(t)
      res.push(leaf)
    } else {
      throw new Error()
    }
  }

  match(lexer: Lexer): boolean {
    return this.test(lexer.peek(0))
  }

  abstract test(t: Token): boolean
}

export class IdToken extends AToken {
  reserved: Set<string>
  
  constructor(type: any, r: Set<string>) {
    super(type)
    this.reserved = r != null ? r : new Set()
  }

  test(t: Token): boolean {
    return t.isIdentifier() && !this.reserved.has(t.getText())
  }
}

export class NumToken extends AToken {
  constructor(type: any) {
    super(type)
  }

  test(t: Token): boolean {
    return t.isNumber()
  }
}

export class StrToken extends AToken {
  constructor(type: any) {
    super(type)
  }

  test(t: Token): boolean {
    return t.isString()
  }
}

export class Leaf extends Element {
  tokens: string[]

  constructor(pat: string[]) {
    super()
    this.tokens = pat
  }

  parse(lexer: Lexer, res: Array<ASTree>): void {
    let t: Token = lexer.read()
    if (t.isIdentifier()) {
      for(let token of this.tokens) {
        if (token === t.getText()) {
          this.find(res, t)
          return;
        }
      }
    }
    if (this.tokens.length > 0) {
      throw new Error()
    } else {
      throw new Error()
    }
  }

  find(res: Array<ASTree>, t: Token): void {
    res.push(new ASTLeaf(t))
  }

  match(lexer: Lexer): boolean {
    let t: Token = lexer.peek(0)
    if (t.isIdentifier()) {
      for(let token of this.tokens) {
        if (token === t.getText()) {
          return true
        }
      }
    }
    return false
  }
}

export class Skip extends Leaf {
  constructor(t: string[]) {
    super(t)
  }

  find(res: Array<ASTree>, t: Token): void {}
}

export class Precedence {
  value: number
  leftAssoc: boolean

  constructor(v: number, a: boolean) {
    this.value = v
    this.leftAssoc = a
  }
}

export class Operators extends Map<string, Precedence> {
  static LEFT: boolean = true
  static RIGHT: boolean = false

  add(name: string, prec: number, leftAssoc: boolean): void {
    this.set(name, new Precedence(prec, leftAssoc))
  }
}

export class Expr extends Element {
  protected factory: Factory
  protected ops: Operators
  protected factor: Parser

  constructor(clazz: any, exp: Parser, map: Operators) {
    super()
    this.factory = Factory.getForASTList(clazz)
    this.ops = map
    this.factor = exp
  }

  parse(lexer: Lexer, res: Array<ASTree>): void {
    let right: ASTree = this.factor.parse(lexer)
    let prec: Precedence
    while((prec = this.nextOperator(lexer)) != null) {
      right = this.doShift(lexer, right, prec.value)
    } 
    res.push(right)
  }

  doShift(lexer: Lexer, left: ASTree, prec: number): ASTree {
    let list: Array<ASTree> = new Array<ASTree>()
    list.push(left);
    list.push(new ASTLeaf(lexer.read()))
    let right: ASTree = this.factor.parse(lexer)
    let next: Precedence
    while ((next = this.nextOperator(lexer)) != null && this.rightIsExpr(prec, next)) {
      right = this.doShift(lexer, right, next.value)
    }
    list.push(right)
    return this.factory.make(list)
  }

  nextOperator(lexer: Lexer): Precedence {
    let t: Token = lexer.peek(0)
    if (t.isIdentifier()) {
      return this.ops.get(t.getText())
    } else {
      return null
    }
  }

  rightIsExpr(prec: number, nextPrec: Precedence): boolean {
    if (nextPrec.leftAssoc) {
      return prec < nextPrec.value
    } else {
      return prec <= nextPrec.value
    }
  }

  match(lexer: Lexer): boolean {
    return this.factor.match(lexer)
  }
}

export class Factory {
  make0(arg: Object): any {};

  make(arg: Object): ASTree {
    try {
      return this.make0(arg)
    } catch (e) {
      throw new Error(e)
    }
  }

  static getForASTList(clazz: any): Factory {
    let f: Factory = this.get(clazz)
    if (f === null) {
      f = new Factory()
      f.make0 = function(arg: Object): ASTree {
        let results: Array<ASTree> = <Array<ASTree>>arg
        if (results.length === 1) {
          return results[0]
        } else {
          return new ASTList(results)
        }
      }
    }
    return f
  }

  static get(clazz: any): Factory {
    if (clazz === null) {
      return null
    }
    try {
      let factor = new Factory()
      if (clazz.create) {
        factor.make0 = function(arg: Object): ASTree {
          return new clazz.create(arg)
        }
      } else {
        factor.make0 = function(arg: Object): ASTree {
          return new clazz(arg)
        } 
      }

      return factor
    } catch (e) {
      throw new Error(e)
    }
  }
} 