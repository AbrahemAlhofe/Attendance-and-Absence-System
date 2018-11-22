function StudentModel() {
  this.Undo = {}
  this.absentees = {};
  this.student = {
    "999" : ["محمد", "السيد"]
  };
  this.observer = []
  this.addObserver = function (f) {
    this.observer.push(f)
  }
  this.addStudent = function (code, name) {
    this.student[code.toString()]
    this.notify()
  }
  this.getFristName = function (code) {
    return this.student[code.toString()][0]
  }
  this.removeAll = function (code) {
    if (code.toString() != "false" && this.student[code.toString()] != undefined) {
       this.Undo[code.toString()] = this.student[code.toString()]
    }
    delete this.student[code.toString()]
    delete this.absentees[code.toString()]
    this.notify()
  }
  this.ctrlZ = function () {
    var code;
    for (let item in last_item(this.Undo)) {
        this.student[item] = last_item(this.Undo)[item]
        if (parseInt(item) != undefined) {
          delete this.Undo[code]
        }
    }
    this.notify()
  }
  this.checkStudent = function (code) {
    return (!this.student[code.toString()]) ? false : true
  }
  this.removeStudent = function (code) {
    for (let studentCode in this.student) {
      if (code != studentCode) {
        this.absentees[studentCode] = this.student[studentCode]
      }
    }
    this.notify()
  }
  this.removeObserver = function (f) {
    for(let fn in this.observer){if(fn != f){this.observer.push(fn)}}
  }
  this.notify = function () {
    var Arr = [this.student, this.absentees];
    for (let func of this.observer) {
      func.apply( this, Arr );
    }
  }
}
var Model = new StudentModel()
