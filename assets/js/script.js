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
    storeTodaysDate();
    update();
    setInterval(update, 1000);
    newDay();
    checkLocalStorage();
    scheduleFocus();
    setInterval(scheduleFocus, 1000);
    displaySchedule();
    saveEvent();
    clearSchedule();
  }

  function storeTodaysDate() {
    dateObj['date'] = todaysDate;
    dateArr.push(dateObj);
    localStorage.setItem('date', JSON.stringify(dateArr));
  }

  function update() {
    var currentDate = moment().format('dddd, MMMM Do');
    var currentYear = moment().format('YYYY');
    var currentTime = moment().format('HH:mm:ss');
    $('#title-date').html(currentDate);
    $('#title-time').html(
      'Here is your schedule for today. The current time is: <b>' +
        currentTime +
        '</b>.'
    );
    $('#title-year').html(currentYear);
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

      storedSchedule = JSON.parse(localStorage.getItem('todaySchedule'));
      scheduleObj = {};

      scheduleObj[trId] = textAreaVal;
      scheduleArr.push(scheduleObj);
      localStorage.setItem('todaySchedule', JSON.stringify(scheduleArr));

      for (var i = 0; i < storedSchedule.length; i++) {
        if (storedSchedule[i].hasOwnProperty(trId)) {
          storedSchedule[i][trId] = textAreaVal;
          scheduleArr = storedSchedule;
          localStorage.setItem('todaySchedule', JSON.stringify(scheduleArr));
          return;
        }
      }
    });
  }

  function newDay() {
    storedSchedule = JSON.parse(localStorage.getItem('todaySchedule'));
    storedDate = JSON.parse(localStorage.getItem('date'));

    if (storedSchedule === null) {
      scheduleArr.push(dateObj);
      localStorage.setItem('todaySchedule', JSON.stringify(scheduleArr));
    } else {
      var scheduleDate = storedSchedule[0]['date'];
      if (scheduleDate !== todaysDate) {
        var oldSchedule = storedSchedule;
        localStorage.setItem(scheduleDate, JSON.stringify(oldSchedule));
        localStorage.removeItem('todaySchedule');
        scheduleArr.push(dateObj);
        localStorage.setItem('todaySchedule', JSON.stringify(scheduleArr));
      }
    }
  }

  function displaySchedule() {
    savedSchedule = JSON.parse(localStorage.getItem('todaySchedule'));

    if (savedSchedule !== null) {
      for (var i = 0; i < savedSchedule.length; i++) {
        var getKey = Object.keys(savedSchedule[i]);
        var getValue = Object.values(savedSchedule[i]);
        $('#area-' + getKey).html(getValue[0]);
      }
    }
  }

  function checkLocalStorage() {
    var existingStorage = JSON.parse(localStorage.getItem('todaySchedule'));

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

  function clearSchedule() {
    $('#clear-button').on('click', function() {
      savedSchedule = JSON.parse(localStorage.getItem('todaySchedule'));

      if (savedSchedule.length <= 1) {
        return;
      } else {
        localStorage.removeItem('todaySchedule');
        location.reload();
      }
    });
  }
});
