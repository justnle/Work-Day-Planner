var now = moment();
var current = moment().format('dddd, MMMM Do YYYY');
var scheduleArr = [];
var storedSchedule;

$('#title-date').html('Event schedule for <b>' + current + '</b>');

$(document).ready(function() {
  init();

  function init() {
    saveEvent();
  }

  // save event version 0.3
  function saveEvent() {
    $('.save-button').on('click', function() {
      var trId = $(this)
        .closest('tr')
        .attr('id');
      var textAreaVal = $(this)
        .closest('tr')
        .find('textarea')
        .val()
        .trim();
      var scheduleObj = {};
      storedSchedule = JSON.parse(localStorage.getItem('schedule'));

      if (storedSchedule === null) {
        scheduleObj[trId] = textAreaVal;
        scheduleArr.push(scheduleObj);
        localStorage.setItem('schedule', JSON.stringify(scheduleArr));
        console.log('creating initial array');
      } else {
        for (var i = 0; i < storedSchedule.length; i++) {
          if (storedSchedule[i].hasOwnProperty(trId)) {
            storedSchedule[i][trId] = textAreaVal;
            scheduleArr = storedSchedule;
            localStorage.clear();
            localStorage.setItem('schedule', JSON.stringify(scheduleArr));
            console.log('replacing stuff');
            return;
          }
        }
        scheduleObj[trId] = textAreaVal;
        scheduleArr.push(scheduleObj);
        localStorage.setItem('schedule', JSON.stringify(scheduleArr));
        console.log('adding new stuff to the array now');
      }
    });
  }
});
