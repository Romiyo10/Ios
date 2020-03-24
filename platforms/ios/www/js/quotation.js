
// Quotation page
$$(document).on('page:mounted', '.page[data-name="quotation"]', function(e) {
    console.log("quotation page mounted");
    StudentData.getItem('student_quotation', function (err, value) {
                        
            //Data to populate here
                        
                        //template 7
                    var template = $$('#template').html();
                        
                    // compile it with Template7
                    var compiledTemplate = Template7.compile(template);
                                            
                    var html = compiledTemplate(value.response);
                    $$("#data").html(html);
            
        
    });
});

