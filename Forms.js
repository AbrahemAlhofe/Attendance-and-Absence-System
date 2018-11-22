//======================================================================================
function notyfiction (elm, kind, meesage) {
  if (meesage == undefined) {
    $(elm).css({"display" : "none"})
    $(elm).parentNode.classList.remove(kind)
  } else {
    $(elm).css({"display" : "block"})
    $(elm).innerHTML = meesage
    $(elm).parentNode.classList.add(kind)
  }
}

function close() {
  forMode($(".pop")).forEach(function (e) {
    $("#overlay").on("click", function () {
      $("#togglelock > span").setAttr("class", "fa fa-unlock")
      this.setAttr("class", "")
      if ($(".pop").length != 0) {
        $(".pop").reset()
        $(".pop").setAttr("class", "")
      }
    })
  })
}
//======================================================================================
/*

             _      _        _               _               _
            | |    | |      | |             | |             | |
   __ _   __| |  __| |  ___ | |_  _   _   __| |  ___  _ __  | |_
  / _` | / _` | / _` | / __|| __|| | | | / _` | / _ \| '_ \ | __|
 | (_| || (_| || (_| | \__ \| |_ | |_| || (_| ||  __/| | | || |_
  \__,_| \__,_| \__,_| |___/ \__| \__,_| \__,_| \___||_| |_| \__|



*/
//------------------------------------------------
$("#add_student").on("click", function () {
  $("#overlay").setAttr("class", "hide")
  $("#togglelock").styleCss("z-index", 1)
  $("#form_add_student").classList.add("pop")
  close()
  $("#inp_frist_name").focus()
})
$("#Con_inp_code > i").on("click", function () {
  $("#Con_inp_code > i").toggleAttr("class", ["fa-eye-slash", "fa-eye"])
  $("#inp_code").toggleAttr("type", ["password"])
})
/*
=======================================================
            Valdition Form
========================================================
*/
var error  = false;
$("#inp_code").shortCut([17, 83], function () {
  $("#Con_inp_code > i").toggleAttr("class", ["fa-eye-slash", "fa-eye"])
  $("#inp_code").toggleAttr("type", ["password"])
})
$("#inp_frist_name").shortCut([32], function () {
  $("#inp_last_name").focus()
})
$("#inp_last_name").shortCut([13], function () {
  $("#inp_code").focus()
})
$("#inp_code").shortCut([13], function () {
  Model.addStudent($("#inp_code").value, [$("#inp_frist_name").value, $("#inp_last_name").value])
  var Empty = [];
  $("#form_add_student input").forEach(function (e) {
    if (e.value == "") {
      Empty.push(e.placeholder)
      notyfiction("#notyfictions", "error", "لقد تركت حقل " + e.placeholder + " فارغا")
    }
  })
  if (Empty.length == 0) {
    $("#overlay").setAttr("class", "")
    $("#form_add_student").toggleAttr("class", ["pop"])
    $("#togglelock").styleCss("z-index", 1)
    $("#form_add_student").reset()
  }
})
$("#inp_last_name, #inp_frist_name").forEach(function (e) {
  e.on("keypress keyup", function () {
    if (e.value.toString().match(/[0-9]/g) != null) {
      e.value = e.value.toString().replace(/[0-9]/g, "")
      notyfiction("#notyfictions", "error", "تنبيه : لايمكنك وضع رقم داخل حقل " + e.placeholder)
    } else {
      notyfiction("#notyfictions", "error")
    }
   if (e.value.toString().match(/[A-z]/g) != null) {
      e.value = e.value.toString().replace(/[A-z]/g, "")
      notyfiction("#notyfictions", "error", "الرجاء الكتابه باللغه العربيه فقط في حقل " + e.placeholder)
   }
  })
})
/*


______                        _____  _               _               _      ___   _    _                    _
|  ___|                      /  ___|| |             | |             | |    / _ \ | |  | |                  | |
| |_  ___   _ __  _ __ ___   \ `--. | |_  _   _   __| |  ___  _ __  | |_  / /_\ \| |_ | |_  ___  _ __    __| |  __ _  _ __    ___  ___
|  _|/ _ \ | '__|| '_ ` _ \   `--. \| __|| | | | / _` | / _ \| '_ \ | __| |  _  || __|| __|/ _ \| '_ \  / _` | / _` || '_ \  / __|/ _ \
| | | (_) || |   | | | | | | /\__/ /| |_ | |_| || (_| ||  __/| | | || |_  | | | || |_ | |_|  __/| | | || (_| || (_| || | | || (__|  __/
\_|  \___/ |_|   |_| |_| |_| \____/  \__| \__,_| \__,_| \___||_| |_| \__| \_| |_/ \__| \__|\___||_| |_| \__,_| \__,_||_| |_| \___|\___|



*/
$("#togglelock").on("click", function () {
  $("#togglelock > span").toggleAttr("class", ["fa-lock", "fa-unlock"])
  $("#overlay").toggleAttr("class", ["hide"])
  if ($("#togglelock").getAttr("class") == "fa-unlock") {
    $("#form_attendance").setAttr("class", "").reset()
    $("#overlay").setAttr("class", "")
  } else {
    $("#form_attendance").toggleAttr("class", ["pop"])
    close()
  }
})
$("#Con_inp_code2 > i").on("click", function () {
  $("#Con_inp_code2 > i").toggleAttr("class", ["fa-eye-slash", "fa-eye"])
  $("#inp_code2").toggleAttr("type", ["password"])
})
/*========================================= ShortCuts ==============================================*/
$("#inp_code2").shortCut([17, 83], function () {
  $("#Con_inp_code2 > i").toggleAttr("class", ["fa-eye-slash", "fa-eye"])
  $("#inp_code2").toggleAttr("type", ["password"])
})
$("#inp_code2").shortCut([13], function () {
  if (Model.checkStudent($("#inp_code2").value)) {
    notyfiction("#notyfictions2", "hello", "اهلا " + Model.getFristName($("#inp_code2").value))
    setTimeout(function () {
      $("#togglelock > span").toggleAttr("class", ["fa-unlock", "fa-lock"])
      $("#overlay").setAttr("class", "")
      Model.removeStudent($("#inp_code2").value)
      $("#form_attendance").toggleAttr("class", ["pop"]).reset()
    }, 1500)
  } else {
    notyfiction("#notyfictions2", "error", "الرمز خطأ أو غير مسجل")
    $("#form_attendance").reset()
  }
})
$("#inp_code2").on("keypress keyup", function (e) {
  if (e.which != 13) {
    notyfiction("#notyfictions2", "error")
  }
})
