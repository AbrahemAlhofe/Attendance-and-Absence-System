//===========================================================================
//                                Classes
//===========================================================================
$(".center").forEach(function (e) {CenterElement(e, true, false)})
//===========================================================================
//                                 Clock
//===========================================================================
setInterval(function () {
  var date = new Date()
  var H = (date.getHours() > 12) ? date.getHours() - 12:date.getHours()
  $("#clock").innerHTML = H.pad() + ":" + date.getMinutes().pad()
}, 1000)
//===========================================================================
//                          Student and #Absentees
//===========================================================================
$("#Student, #Absentees").forEach(function (e) {
  e.on("click", function () {e.specialClass("selected");Model.notify()})
})
