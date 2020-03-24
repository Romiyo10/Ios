
// exams page
$$(document).on('page:mounted', '.page[data-name="results"]', function (e) {
    console.log("Results page mounted");
    StudentData.getItem('student_results', function (err, value) {
        
        
        //Data to populate here
                        
                        //template 7
                    var template = $$('#template').html();
                        
                    // compile it with Template7
                    var compiledTemplate = Template7.compile(template);
                                            
                    var html = compiledTemplate(value.response);
                    $$("#data").html(html);
        
        
    });
});

