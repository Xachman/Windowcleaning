var fs = require('fs');

var includeInThisContext = function(path) {
    document.write(fs.readFileSync(path));
}.bind(this);
