//var url = "http://srms.zynle.com:8080/api/studentportal";

//var url = "http://127.0.0.1:8080/trunk/pums/../api/studentportal";

var url = "http://elearning.zaou.ac.zm:8080/api/studentportal";

$$(document).on("click", ".student-login", function () {
    app.preloader.show();
    var student_id = $$('#login-form input[name = "username"]').val();
    var password = $$('#login-form input[name = "password"]').val();
    
    var emptyFields;
    
    if(student_id == "" || password == ""){
        app.preloader.hide();
        emptyFields = app.toast.create({
        text: 'Please enter username and password',position: 'center',
        closeTimeout: 1000,});
        
        emptyFields.open();
    }else{
        app.request.json(
            url, 
            { student_id:student_id, password:password ,method:"login" }, 
            function (data) {
                
            console.log(data);
               
                var response_code = data.response.response_code;
                var token = data.response.token;
                
                if(response_code=="1000"){
                    //localforage.clear();
                    StudentData.setItem('student_token', data).then(function (value) { 
                       
                        app.request.json(url, 
                                        { student_id:student_id, token:token ,method:"academic" }, 
                                        function (data) {

                                        console.log(data);

                                            var response_code = data.response.response_code;


                                            if(response_code=="1000"){

                                                StudentData.setItem('student_biodata', data).then(function () { 
                                                    app.preloader.hide();
                                                    mainView.router.navigate('/dashboard/');
                                                     return StudentData.getItem('key');
                                                }).catch(function (err) {
                                                    console.log("Error Adding student_biodata to LocalDB : " + err);
                                                });

                                            }else{
                                                app.preloader.hide();
                                                emptyFields = app.toast.create(
                                                    {text: 'Invalid data',
                                                    position: 'center',
                                                     closeTimeout: 1000,
                                                    });

                                                emptyFields.open();
                                            }



                                        });
                        
                        
                    }).catch(function (err) {
                        console.log("Error Adding Phone to LocalDB : " + err);
                    });
                    
                    
                }else{
                    app.preloader.hide();
                    emptyFields = app.toast.create(
                        {text: 'Invalid username or password',
                        position: 'center',
                         closeTimeout: 1000,
                        });
                    
                    emptyFields.open();
                }
                
                
                
            });
        
        // get the bio data too
        
            
        
    }
    
    
    
});

// Dashboard page

/** $$(document).on('page:mounted', '.page[data-name="dashboard"]', function (e) { 

    


}); **/


