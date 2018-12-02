//===========================================================================
//                                Classes
//===========================================================================
forMode($(".center")).forEach(function (e) {CenterElement(e, true, true, true)})
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
//===========================================================================
//                          Student and #Absentees
//===========================================================================
//===============================================================
//===============================================================
//===============================================================
var SliderForm = new slideShow({
  elm : "#sliderChosse",
  speed: 360
})
$("#Window_Display_Options li").forEach(function (e) {
  CenterElement(e, true)
  e.on("click", function () {e.specialClass("classSelect");SliderForm.previousSlide();Model.notify()})
})
$("#Window_Display_Options2 li").forEach(function (e) {
  CenterElement(e, true)
  e.on("click", function () {e.specialClass("gradeSelect");SliderForm.nextSlide();Model.notify()})
})
