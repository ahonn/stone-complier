import StoneException from "../Exception/StoneException"

class Token {
  static EOF = new Token(-1)
  static EOL = "\\n"
  private lineNumber: number
  
  constructor(line: number) {
    this.lineNumber = line
  }

  getLineNumber(): number {
    return this.lineNumber
  }

  isNumber(): boolean {
    return false 
  }

  isIdentifier(): boolean { 
    return false 
  }

  isString(): boolean  {
    return false 
  }
  
  getNumber(): void { 
    throw new StoneException("not number token")
  }

  getText(): string {
    return ""
  }
}

export default Token