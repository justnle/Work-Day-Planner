var now = moment();
var current = moment().format('dddd, MMMM Do YYYY');
var scheduleArr = [];
var storedSchedule;

$('#title-date').html('Event schedule for <b>' + current + '</b>');

$(document).ready(function() {
  init();

  function init() {
    // saveEventV02();
    saveEventV03();
  }

  //   function saveEventV02() {
  //     $('.save-button').on('click', function() {
  //       var trId = $(this)
  //         .closest('tr')
  //         .attr('id');
  //       var textAreaVal = $(this)
  //         .closest('tr')
  //         .find('textarea')
  //         .val();
  //       var scheduleObj = {};

  //       if (textAreaVal === '') {
  //         return;
  //       } else {
  //         checkExisting(trId);
  //         scheduleObj[trId] = textAreaVal.trim();
  //         scheduleArr.push(scheduleObj);
  //         localStorage.setItem('schedule', JSON.stringify(scheduleArr));
  //       }
  //     });
  //   }

  function saveEventV03() {
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

      //   if (storedSchedule !== null) {
      //     for (var i = 0; i < storedSchedule.length; i++) {
      //       if (storedSchedule[i].hasOwnProperty(trId)) {
      //         storedSchedule[i][trId] = textAreaVal;
      //         console.log('stuck here');
      //       } else {
      //         scheduleObj[trId] = textAreaVal;
      //         scheduleArr.push(scheduleObj);
      //         localStorage.setItem('schedule', JSON.stringify(scheduleArr));
      //         console.log('adding new stuff to the array now');
      //       }
      //     }
      //   } else {
      //     scheduleObj[trId] = textAreaVal;
      //     scheduleArr.push(scheduleObj);
      //     localStorage.setItem('schedule', JSON.stringify(scheduleArr));
      //     console.log('creating initial array');
      //   }

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

  //   function checkExisting(x) {
  //     storedSchedule = JSON.parse(localStorage.getItem('schedule'));
  //     console.log(storedSchedule);

  //     if (storedSchedule !== null) {
  //       for (var i = 0; i < storedSchedule.length; i++) {
  //         if (storedSchedule[i].hasOwnProperty(x)) {
  //           storedSchedule[i][x] =
  //         } else {
  //           console.log(storedSchedule.hasOwnProperty(x));
  //           alert('no');
  //         }
  //       }
  //     }
});
