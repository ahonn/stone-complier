var expect = require('chai').expect

var Token = require('../built/Token/Token').default
var NumToken = require('../built/Token/NumToken').default
var StrToken = require('../built/Token/StrToken').default
var IdToken = require('../built/Token/IdToken').default

describe('Token Test', function() {
  describe('Token', function() {
    var token = new Token(6)

    it('isType', function() {
      expect(token.isNumber()).to.be.false
      expect(token.isString()).to.be.false
      expect(token.isIdentifier()).to.be.false
    })

    it('getLineNumber', function() {
      expect(token.getLineNumber()).to.be.equal(6)
    })

    it('getText', function() {
      expect(token.getText()).to.be.equal("")
    })
  })

  describe('NumToken', function() {
    var numToken = new NumToken(2, 12)

    it('isNumber', function() {
      expect(numToken.isNumber()).to.be.true
      expect(numToken.isString()).to.be.false
      expect(numToken.isIdentifier()).to.be.false
    })

    it('getNumber', function() {
      expect(numToken.getNumber()).to.be.equal(12)
    })

    it('getText', function() {
      expect(numToken.getText()).to.be.equal("12")
    })
  })

  describe('StrToken', function() {
    var strToken = new StrToken(2, "This is string")

    it('isString', function() {
      expect(strToken.isNumber()).to.be.false
      expect(strToken.isString()).to.be.true
      expect(strToken.isIdentifier()).to.be.false
    })

    it('getText', function() {
      expect(strToken.getText()).to.be.equal("This is string")
    })
  })

  describe('IdToken', function() {
    var idToken = new IdToken(2, "==")

    it('isIdentifier', function() {
      expect(idToken.isNumber()).to.be.false
      expect(idToken.isString()).to.be.false
      expect(idToken.isIdentifier()).to.be.true
    })

    it('getText', function() {
      expect(idToken.getText()).to.be.equal("==")
    })
  })
})