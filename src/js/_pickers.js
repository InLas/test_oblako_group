$(document).ready(function () {
  $.datetimepicker.setLocale('ru');
  $('#datepicker1').datetimepicker({
    timepicker: false,
    format: 'd.m',
  });
  $('#datepicker2').datetimepicker({
    timepicker: false,
    format: 'd.m',
  });
  $('#datepicker3').datetimepicker({
    timepicker: false,
    format: 'd.m',
  });
});