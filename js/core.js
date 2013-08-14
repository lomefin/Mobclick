var uploadCounter = 0;
var loginSuccess = function()
{
  $('#loginScreen').fadeOut();
  $('#app').fadeIn();
}

var doLogin = function(e)
{
  e.preventDefault();
  loginSuccess();
}
var createNewForm = function()
{
  var form = $('<form role="form" enctype="multipart/form-data">')
  var fileInput = $('<input type="file" name="my_file">');
  var submitBtn = $('<input type="submit" value="Upload">');
  form.addClass('uploader');
  form.data('counter',uploadCounter);
  form.attr('id','uploader-id-'+uploadCounter);
  form.append(fileInput);
  form.append(submitBtn);

  $('#uploaders').append(form);
  var tOptions = $.extend({fields:{formId:uploadCounter}},TRANSLOADIT_OPTIONS)
  form.transloadit(tOptions);
  uploadCounter++;
}
var uploadStarted = function(upload)
{
  var formId = upload.fields.formId;
  var lastForm = $('#uploader-id-'+formId);
  lastForm.removeClass('uploader');
  lastForm.hide();
  var uploadStatus = $('<div class="progress progress-striped active">').attr('id','progress-'+formId);
  var progressBar = $('<div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">');
  var srOnly = $('<span class="sr-only">').text('Uploading');
  $('#uploads').append(uploadStatus.append(progressBar.append(srOnly)));
}
var pictureUploaded = function(assembly)
{
  console.log ("Picture uploaded, assembly: ", assembly);
  var result = assembly.results.small[0];
  var picture = $('<img class="img-responsive img-thumbnail">').attr('src',result.url);
  $('.progress').first().fadeOut();
  picture.hide();
  $('#results').prepend(picture);
  picture.fadeIn('slow');

  createNewForm();

}


var TRANSLOADIT_OPTIONS = {
    wait: true,

    params: {
      auth: {key: "eb853f4864944975b264679bc697cdd2"},
      template_id: "ac4192d7b9432529d50595074b264da3",
    },
    debug: true,
    autoSubmit: false,
    modal: false,
    onSuccess: pictureUploaded,
    onStart: uploadStarted,
    onError: createNewForm
 }


$(function(){
  $('#loginScreen form').submit(doLogin);
  $('#app').fadeIn('slow');
  createNewForm();
});