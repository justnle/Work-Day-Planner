var scheduleArr = [];
var scheduleObj = {};
var dateArr = [];
var dateObj = {};
var storedSchedule;
var savedSchedule;
var todaysDate = moment().format('LL');

$(document).ready(function() {
  init();

  function init() {
    todaysDateLocal();
    updateTime();
    setInterval(updateTime, 1000);
    clearYesterday();
    getLocalStorage();
    scheduleFocus();
    displaySchedule();
    saveEvent();
  }

  function todaysDateLocal() {
    dateObj['date'] = todaysDate;
    dateArr.push(dateObj);
    localStorage.setItem('date', JSON.stringify(dateArr));
  }

  function updateTime() {
    var currentDate = moment().format('dddd, MMMM Do YYYY');
    var currentTime = moment().format('HH:mm:ss');
    $('#title-date').html(currentDate);
    $('#title-time').html(
      'Here is your schedule for today. The time is: <b>' +
        currentTime +
        '</b>.'
    );
  }

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

      storedSchedule = JSON.parse(localStorage.getItem('schedule'));
      scheduleObj = {};

      scheduleObj[trId] = textAreaVal;
      scheduleArr.push(scheduleObj);
      localStorage.setItem('schedule', JSON.stringify(scheduleArr));

      for (var i = 0; i < storedSchedule.length; i++) {
        if (storedSchedule[i].hasOwnProperty(trId)) {
          storedSchedule[i][trId] = textAreaVal;
          scheduleArr = storedSchedule;
          localStorage.setItem('schedule', JSON.stringify(scheduleArr));
          return;
        }
      }
    });
  }

  function clearYesterday() {
    storedSchedule = JSON.parse(localStorage.getItem('schedule'));
    storedDate = JSON.parse(localStorage.getItem('date'));

    if (storedSchedule === null) {
      scheduleArr.push(dateObj);
      localStorage.setItem('schedule', JSON.stringify(scheduleArr));
    } else {
      if (storedSchedule[0]['date'] !== storedDate[0]['date']) {
        localStorage.removeItem('schedule');
        scheduleArr.push(dateObj);
        localStorage.setItem('schedule', JSON.stringify(scheduleArr));
      } 
    }
  }

  function displaySchedule() {
    savedSchedule = JSON.parse(localStorage.getItem('schedule'));

    if (savedSchedule !== null) {
      for (var i = 0; i < savedSchedule.length; i++) {
        var getKey = Object.keys(savedSchedule[i]);
        var getValue = Object.values(savedSchedule[i]);
        $('#area-' + getKey).html(getValue[0]);
      }
    }
  }

  function getLocalStorage() {
    var existingStorage = JSON.parse(localStorage.getItem('schedule'));

    if (existingStorage !== null) {
      scheduleArr = existingStorage;
    } else {
      scheduleArr = [];
    }
  }

  function scheduleFocus() {
    var currentHourInt = parseInt(moment().format('HH'));

    var timeIDs = $('#schedule-table tr[id]')
      .map(function() {
        return this.id;
      })
      .get();

    for (var i = 0; i < timeIDs.length; i++) {
      var timeIDsInt = parseInt(timeIDs[i]);
      if (timeIDsInt < currentHourInt) {
        $('#' + timeIDs[i])
          .find('textarea')
          .css('background-color', 'grey');
      } else if (timeIDsInt === currentHourInt) {
        $('#' + timeIDs[i])
          .find('textarea')
          .css('background-color', '#ccffff');
      } else {
        $('#' + timeIDs[i])
          .find('textarea')
          .css('background-color', 'lightblue');
      }
    }
  }

  // function clearSchedule() {
  //     $('#clear-button').on('click', function() {
  //         $('textarea').html("");
  //         localStorage.clear();
  //         displaySchedule();
  //     });
  // } this does not work properly
});
