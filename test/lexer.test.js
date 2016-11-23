var expect = require('chai').expect

var Lexer = require('../built/Lexer/Lexer').default
var Token = require('../built/Token/Token').default
var NumToken = require('../built/Token/NumToken').default
var StrToken = require('../built/Token/StrToken').default
var IdToken = require('../built/Token/IdToken').default

describe('Lexer Test', function() {
  var str = "for \n \"string\" \n 123 \n"
  var lexer = new Lexer(str)

  it('isComments', function() {
    var comments = "// comments"
    expect(lexer.isComments(comments)).to.be.true

    var notComments = "/ notComments"
    expect(lexer.isComments(notComments)).to.be.false
  })

  it('isNumber', function() {
    var number = "1"
    expect(lexer.isNumber(number)).to.be.true

    var notNumber = "abc"
    expect(lexer.isNumber(notNumber)).to.be.false
  })

  it('isString', function() {
    var string = "\"string\""
    expect(lexer.isString(string)).to.be.true

    var notString = "\"notString"
    expect(lexer.isString(notString)).to.be.false
  })

  it('isIdentifier', function() {
    var id = "&&"
    expect(lexer.isIdentifier(id)).to.be.true

    var notId = "123"
    expect(lexer.isIdentifier(notId)).to.be.false
  })

  it('read', function() {
    expect(lexer.read()).to.be.eql(new IdToken(1, "for"))
  })

  it('peek', function() {
    expect(lexer.peek(0)).to.be.eql(new IdToken(1, Token.EOL))
    expect(lexer.peek(1)).to.be.eql(new StrToken(2, "\"string\""))
    expect(lexer.peek(3)).to.be.eql(new NumToken(3, 123))
    expect(lexer.peek(12)).to.be.eql(Token.EOF)
  })
})