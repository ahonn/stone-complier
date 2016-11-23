import StoneException from "../Exception/StoneException"

class Token {
  static EOF = new Token(-1)
  static EOL = "\\n"
  private lineNumber: number
  
  constructor(line: number) {
    this.lineNumber = line
  }

  getLineNumber() {
    return this.lineNumber
  }

  isNumber() {
    return false 
  }

  isIdentifier() { 
    return false 
  }

  isString() {
    return false 
  }
  
  getNumber() { 
    throw new StoneException("not number token")
  }

  getText() {
    return ""
  }
}

export default Token