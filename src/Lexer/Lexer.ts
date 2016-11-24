import Token from '../Token/Token'
import NumToken from '../Token/NumToken'
import StrToken from '../Token/StrToken';
import IdToken from '../Token/IdToken';
import ParseException from '../Exception/ParseException';

class Lexer {
  static regexPat: RegExp = /\s*((\/\/.*)|(\d+)|(\"(\\\\\"|\\\\\\\\|\\\\n|[^\"])*\")|([A-Z_a-z]\w*|==|<=|>=|&&|\|\||[^\w\d\s\n\t]{1}))/g

  private queue: Array<Token> = new Array()
  private hasMore: boolean
  private reader: string

  constructor(input) {
    this.hasMore = true
    this.reader = input    
  }

  isComments(text: string): boolean {
    let re = /^\/\/.*/
    return re.test(text)
  }

  isNumber(text: string): boolean {
    let re = /^\d+/
    return re.test(text)
  }

  isString(text: string): boolean {
    let re = /^(\"(\\\\\"|\\\\\\\\|\\\\n|[^\"])*\")/
    return re.test(text)
  }

  isIdentifier(text: string): boolean {
    let re = /^([A-Z_a-z]\w*|==|<=|>=|&&|\|\||[^\w\d\s\n\t]{1})/
    return re.test(text)
  }

  read(): Token {
    if (this.fillQueue(0)) {
      return this.queue.shift()
    }
    return Token.EOF
  }

  peek(i: number): Token {
    if (this.fillQueue(i)) {
      return this.queue[i]
    }
    return Token.EOF
  }

  fillQueue(i: number): boolean {
    if (i >= this.queue.length) {
      if (this.hasMore) {
        this.readLine()
      } else {
        return false
      }
    }
    return true
  }

  readLine(): void {
    let lines = this.reader.split('\n')
     
    lines.map((line, lineNo) => {
      let matcher = line.match(Lexer.regexPat)
     
      lineNo += 1
      this.addToken(lineNo, matcher)
      this.queue.push(new IdToken(lineNo, Token.EOL))
    })

    this.hasMore = false
  }

  addToken(lineNo: number, matcher: string[]): void {
    while (matcher && matcher.length) {
      let text: string = matcher.shift().trim()
      if (text && !this.isComments(text)) {
        let token: Token
        if (this.isNumber(text)) {
          token = new NumToken(lineNo, parseInt(text))
        } else if (this.isString(text)) {
          token = new StrToken(lineNo, text)
        } else if (this.isIdentifier(text)) {
          token = new IdToken(lineNo, text)
        } else {
          throw new ParseException('bad token at line ' + lineNo)
        }
        
        this.queue.push(token)
      }
    }
  } 
}

export default Lexer