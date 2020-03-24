
// exams page
$$(document).on("click", ".register", function () {
    console.log("Results page mounted");
    StudentData.getItem('student_token', function (err, value) {
        var token = value.response.token;
        var student_id = value.response.student_id;
        console.log("The token value is: => " + token);
        console.log("The student_id value is: => " + student_id);
        
        if (token == "" || student_id == "") {
            emptyFields = app.toast.create(
                {
                    text: 'Invalid Request',
                    position: 'center',
                    closeTimeout: 1000,
                });
            emptyFields.open();
        } else {
            
            app.request.json(
                url,
                { student_id: student_id, token: token, method: "register" },
                function (data) {
                    console.log("loggin data");
                    console.log(data);
                    var response_code = data.response.response_code;
                    if (response_code == "1000") {
                            // update student biodata
                                app.request.json(url, 
                                    { student_id:student_id, token:token ,method:"academic" }, 
                                    function (data) {

                                    console.log(data);

                                        var response_code = data.response.response_code;

                                        if(response_code=="1000"){

                                            StudentData.setItem('student_biodata', data).then(function () { 
                                                return StudentData.getItem('key');
                                            }).catch(function (err) {
                                                console.log("Error Adding student_biodata to LocalDB : " + err);
                                            });

                                        }else{
                                            console.log("failed to update student biodata");
                                        }

                                    });
                        
                        emptyFields = app.toast.create({
                                              text: 'Please check your status again at a later time to see if you have been registered.',
                                              position: 'center',
                                              closeButton: true,
                                        });
                        emptyFields.open();
                    } else {
                        emptyFields = app.toast.create(
                            {
                                text: 'Invalid data',
                                position: 'center',
                                closeTimeout: 1000,
                            });
                        emptyFields.open();
                    }
                });
        }
    });
});


$$(document).on('page:mounted', '.page[data-name="register"]', function (e) { 
    // disable the register button
        $$(".register").addClass('disabled');
    // get student token and student id
    var token;
    var student_id;
    StudentData.getItem('student_token', function (err, value) {
        token = value.response.token;
        student_id = value.response.student_id;
    });
    // get student biodata
    StudentData.getItem('student_biodata', function (err, value) {
        var biostatus = value.response.biodata.status;
        
             var emptyfields;   
        
        if (biostatus == "" || biostatus == null) {
            emptyFields = app.toast.create(
                {
                    text: 'Invalid Request, please try again',
                    position: 'center',
                    closeTimeout: 1000,
                });
            emptyFields.open();
        } else {
            // update student biodata
                app.request.json(url, 
                    { student_id:student_id, token:token ,method:"academic" }, 
                    function (data) {

                    console.log(data);

                        var response_code = data.response.response_code;

                        if(response_code=="1000"){

                            StudentData.setItem('student_biodata', data).then(function () { 
                                return StudentData.getItem('key');
                            }).catch(function (err) {
                                console.log("Error Adding new student_biodata to LocalDB : " + err);
                            });

                        }else{
                            console.log("failed to update student biodata");
                        }

                    });
            
                 //template 7
                var template = $$('#template').html();

                // compile it with Template7
                var compiledTemplate = Template7.compile(template);

                
            
              if(biostatus == 'wapproval'){
                    $$("#result").html("Waiting Approval");
               } else if(biostatus == 'inactive'){
                    $$("#result").html("Not Registered");
                    $$(".register").removeClass('disabled');
                   //The Template will have standard courses
                   var html = compiledTemplate(value.response.standard_courses);
                    $$("#data").html(html);
               } else if(biostatus == 'active'){
                    $$("#result").html("Registerd");
                   //The Template will have registered courses
                   var html = compiledTemplate(value.response.registered_courses);
                    $$("#data").html(html);
               }else if(biostatus == 'approved'){
                    $$("#result").html("Waiting Payment");
                    //The Template will have standard courses
                   var html = compiledTemplate(value.response.standard_courses);
                    $$("#data").html(html);
               }else {
                   $$("#result").html("Not Registered");
                   $$(".register").removeClass('disabled');
                   //The Template will have standard courses
                   var html = compiledTemplate(value.response.standard_courses);
                    $$("#data").html(html);
               }
            
        }
        
    });


});
