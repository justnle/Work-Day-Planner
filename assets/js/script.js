var now = moment();
var current = moment().format('dddd, MMMM Do YYYY');
var schedule = [];

$('#title-date').html('Event schedule for <b>' + current + '</b>');

$(document).ready(function() {
  init();

  function init() {
    saveEvent();
  }

  function saveEvent() {
    $('.save-button').on('click', function() {
      var trId = $(this)
        .closest('tr')
        .attr('id');
      var textAreaVal = $(this)
        .closest('tr')
        .find('textarea')
        .val();
      var scheduleObj = {};

      if (textAreaVal === '') {
        return;
      } else {
        scheduleObj[trId] = textAreaVal.trim();
        schedule.push(scheduleObj);
      }

      console.log(scheduleObj);
      console.log(schedule);
    });
  }
});
