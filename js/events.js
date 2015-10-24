$(document).ready(function(){
  $('.home .button').click(function(e){
    e.preventDefault();
    console.log('hi');
    global.template = $(this).attr('href');
    window.open($(this).attr('href'));
  });
  $('#startServer').click(function(){
    child.execSync('START /B mysqld', {encoding: 'utf-8', cwd: './mysql-5.6.27-winx64/bin', timeout: 1000});

    console.log(child.execSync('mysqladmin -u root status', {encoding: 'utf-8', cwd: './mysql-5.6.27-winx64/bin', timeout: 1000}));
    db.connect();
    setTimeout(function(){
      var settings = {
        limit: '1',
        off: 0,
        fields: 'id',
      }

      queryClients(settings);
    }, 1000);

  });
  $('#stopServer').click(function(){
    db.end();
    child.execSync('mysqladmin -u root shutdown ', {encoding: 'utf-8', cwd: './mysql-5.6.27-winx64/bin'});
    var settings = {
      limit: '1',
      off: 0,
      fields: 'id',
    }

    queryClients(settings);
  });
})
