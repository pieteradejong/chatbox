var parseId = "9iPVRUziGevikrZy6V1itP7XpMDWCEa7ZBjaubUV";
var parseRestKey = "gZHbeg2TYp4PEG2iWecAhQtgjRJnnswNnmOLeuZW";


$(document).ready(function() {
  getMessages();
  $("#send").click(function() {
    var username = $("input[name=username]").val();
    var message = $("input[name=message]").val();
    console.log("Username: ", username);
    console.log("Message: ", message);
    $.ajax({
      url: 'https://api.parse.com/1/classes/Chatterbox',
      headers: {
        'X-Parse-Application-ID': parseId,
        'X-Parse-REST-API-key': parseRestKey
      },
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'username': username,
        'message': message
      }),
      type: 'POST',
      success: function() {
        console.log('sent');
        getMessages();
      },
      error: function() {
        console.log('error');
      }
    });
  });
});

var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/Chatterbox',
      headers: {
        'X-Parse-Application-ID': parseId,
        'X-Parse-REST-API-key': parseRestKey
      },
      contentType: 'application/json',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log('get');
        updateView(data);
      },
      error: function() {
        console.log('error');
      }
  });
}

var updateView = function(messages) {
  var table = $(".table tbody");
  table.html("");
  $.each(messages.results, function(index, value) {
    var tableRow = $("<tr><td>" + value.username + "</td><td>" + value.message + "</td></tr>");
    table.append(tableRow);
  });
  console.log(messages);
}
