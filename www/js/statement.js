// Finance page
$$(document).on('page:mounted', '.page[data-name="statement"]', function (e) { 


console.log("Finance page mounted");

    StudentData.getItem('student_statement', function (err, value) {
        
        //Data to populate here
                        
                        //template 7
                    var template = $$('#template').html();
                        
                    // compile it with Template7
                    var compiledTemplate = Template7.compile(template);
                                            
                    var html = compiledTemplate(value.response);
                    $$("#data").html(html);
        
    });


});

