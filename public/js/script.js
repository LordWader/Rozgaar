$('#scan1').click(function(){
  $('#scan1').hide();
  $('#scan2').show();
  console.log('haa bhai haa');
  $('#name').val('H Sneha N Rao');
  $('#adhaarNo').val('500048244102');
  $('#gp').val('Andheri');
})

$('#scan2').click(function(){
  $('#JobNo').val('56781234');
  $('#proceed').removeClass("disabled");
  $('#proceed').prop( "disabled", false );
})
