jQuery(document).ready(function () {
  $.datepicker.setDefaults($.datepicker.regional["ru"]);
  $("#datepicker1").datepicker({
    dateFormat: 'dd.mm',
    changeYear: true,
    showOn: "button",
    buttonImage: "../img/svg/calendar.svg",
    buttonImageOnly: true,
  });
  $("#datepicker2").datepicker({
    dateFormat: 'dd.mm',
    changeYear: true,
    showOn: "button",
    buttonImage: "../img/svg/calendar.svg",
    buttonImageOnly: true,
  });
  $("#datepicker3").datepicker({
    dateFormat: 'dd.mm',
    changeYear: true,
    showOn: "button",
    buttonImage: "../img/svg/calendar.svg",
    buttonImageOnly: true,
  });
});

(function (factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(["../widgets/datepicker"], factory);
  } else {

    // Browser globals
    factory(jQuery.datepicker);
  }
})(function (datepicker) {
  "use strict";

  datepicker.regional.ru = {
    closeText: "Закрыть",
    prevText: "&#x3C;Пред",
    nextText: "След&#x3E;",
    currentText: "Сегодня",
    monthNames: ["Январь,", "Февраль,", "Март,", "Апрель,", "Май,", "Июнь,",
      "Июль,", "Август,", "Сентябрь,", "Октябрь,", "Ноябрь,", "Декабрь,"],
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
      "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    weekHeader: "Нед",
    dateFormat: "dd.mm.yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ""
  };
  datepicker.setDefaults(datepicker.regional.ru);

  return datepicker.regional.ru;

});