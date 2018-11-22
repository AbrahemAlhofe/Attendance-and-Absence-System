$("body").shortCut([17, 90], function () {
  Model.ctrlZ()
}, false)
//////////////////////////////////////////////////////////////////////////////////////////////
var Menu = $(".menu")
function menu_delet() {
  var e = $(Menu.getAttr("data-elm"))
  Menu.classList.remove("popUp")
  alert('هل تريد حذف الطالب ' + e.innerHTML);
  Model.removeAll(e.data("code"))
}
function menu_edit() {
  var e = $(Menu.getAttr("data-elm")),
      Name = e.innerHTML.toString().split(" "),
      firstName = Name[0],
      rest_Name = (Name.length == 2) ? Name[1] : Name.slice(1, Name.length - 1);
  Menu.classList.remove("popUp")
  $("#form_add_student").fillForm([firstName, rest_Name, e.data("code")])
  $("#add_student").click()
}
function contextmenu2(evt, elm) {
  Menu.classList.add("popUp")
  Menu.setAttr("data-elm", elm)
  Menu.css({"left" : evt.clientX + "px","top" : evt.clientY + "px"})
  Menu.onClickOut(function () {Menu.classList.remove("popUp")})
}
//////////////////////////////////////////////////////////////////////////////////////////////
function viewWindow(student, absentees) {
  var Obje = {student: student, absentees: absentees},
      select = Obje[$(".selected").getAttr("data-group")],
      index = Object.keys(select).length;
  $("#list_student").innerHTML = ""
  var Arr_ = []
  for (let st in select) {
    var S = $("<li>")
    S.settings({
      "class" : "student-field",
      "data" : {
        "code" : st,
        "num" : index.pad(2)
      }
    })
    index -= 1
    S.innerHTML = select[st].join(" ")
    S.on("contextmenu", function (ev) {
      contextmenu2(ev, this.outerHTML)
      ev.preventDefault()
    })
    Arr_.push(S)
  }
  Arr_.sort().forEach(function  (e) {
    $("#list_student").insertBefore(e, $("#list_student").childNodes[0])
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////
function Number(student, absentees) {
  var studentNumber = Object.keys(student).length.toString(),
      absenteesNumber = (Object.keys(student).length == Object.keys(absentees).length) ? "0" : Object.keys(absentees).length.toString();
  ///////////////////////////////////////////
  $("#Number_total").setAttr("data-number", studentNumber)
  $("#Number_absentees").setAttr("data-number", absenteesNumber)
  var attendeesNumber = parseInt($("#Number_total").getAttr("data-number")) - parseInt($("#Number_absentees").getAttr("data-number"));
  $("#Number_attendees").setAttr("data-number", attendeesNumber.toString())
}
Model.addObserver(Number)
Model.addObserver(viewWindow)
Model.notify()
