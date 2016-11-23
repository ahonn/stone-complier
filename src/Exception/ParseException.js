class ParseException extends Error {
  constructor(message) {
    super()
    this.message = message || "Unknow Error"
    this.name = "ParseException"
  }
}

module.exports = ParseException