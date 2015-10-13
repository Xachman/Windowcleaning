$(document).ready(function(){
  $('.button').click(function(e){
    e.preventDefault();
    console.log('hi');
    global.template = $(this).attr('href');
    window.open('app://window/index.html');
  });
})
