var now = moment();
var current = moment().format('dddd, MMMM Do YYYY');
var scheduleArr = [];
var storedSchedule;
var savedSchedule;

$('#title-date').html('Event schedule for <b>' + current + '</b>');

$(document).ready(function() {
  init();

  function init() {
    saveEvent();
    displaySchedule();
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
            // localStorage.clear();
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

  function displaySchedule() {
      savedSchedule = JSON.parse(localStorage.getItem('schedule'));

      for (var i = 0; i < savedSchedule.length; i++) {
          var getKey = Object.keys(savedSchedule[i]);
          var getValue = Object.values(savedSchedule[i]);
          $('#area-' + getKey).html(getValue[0]);
      }
      
  }
});
