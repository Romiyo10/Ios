$$(document).on('page:mounted', '.page[data-name="dashboard"]', function (e) {  
    // enable panel on home page after login since it is disabled by default
    app.panel.enableSwipe("left");
   StudentData.getItem('student_biodata', function (err, value) {
        
            
            $$("#name").html(value.response.biodata.student_name);
                        $$("#program").html(value.response.biodata.program_name);
                        $$("#year").html(value.response.biodata.year_of_study);

                        if(value.response.biodata.status == 'wapproval'){
                                $$("#status").html("Waiting Approval");
                           } else if(value.response.biodata.status == 'inactive'){
                                $$("#status").html("Not Registered");
                           }else if(value.response.biodata.status == 'approved'){
                                $$("#status").html("Waiting Payment");
                           } else if(value.response.biodata.status == 'active'){
                                $$("#status").html("Registerd");
                           } else {
                               $$("#status").html("Not Registered");
                           }
                        
            
       // }
        
    });


});


$$(document).on('page:afterin', '.page[data-name="dashboard"]', function (e) {
  
    StudentData.getItem('student_token', function (err, value) {
        var token = value.response.token;
        var student_id = value.response.student_id;
        
        
        // get the quotations
    app.request.json(
                url,
                { student_id: student_id, token: token, method: "quotation" },
                function (data) {
                    var response_code = data.response.response_code;
                    if (response_code == "1000") {
                        StudentData.setItem('student_quotation', data).then(function () {
                            
                            
                    console.log(data);
                            
                            
                            return StudentData.getItem('key');
                        }).catch(function (err) {
                            console.log("Error Adding student_quotation to LocalDB : " + err);
                        });
                        
                        
                    } else {
                        console.log("unable to get quotation info");
                    }
                });
        
        
        // get the statement data
        
        app.request.json(
            url, 
            { student_id:student_id, token:token ,method:"finance" }, 
            function (data) {
                
            console.log(data);
                
                var response_code = data.response.response_code;
                            
                
                if(response_code!="1000"){
                    StudentData.setItem('student_statement', data).then(function () { 
                        return StudentData.getItem('key');
                    }).catch(function (err) {
                        console.log("Error Adding student_statement to LocalDB : " + err);
                    });
                    
                }else{
                    console.log("unable to get student statement info");
                }
                
                
                
            });
        
        // get the results
        
        app.request.json(
                url,
                { student_id: student_id, token: token, method: "examination" },
                function (data) {
                    console.log("loggin data");
                    console.log(data);
                    var response_code = data.response.response_code;
                    if (response_code == "1000") {
                        StudentData.setItem('student_results', data).then(function () {
                            return StudentData.getItem('key');
                        }).catch(function (err) {
                            console.log("Error Adding student_results to LocalDB : " + err);
                        });
                        console.log("reaching here");
                        //Data to populate here
                    } else {
                        console.log("unable to get student results info");
                    }
                });
        
        
        
        
    });
    
    
    
    
    
});


$$(document).on("click", ".disable_panel", function () {
   // disable swipe so it is not available on login page    
    app.panel.disableSwipe("left");
    var mypage = app.views.main.router.currentRoute.name;

if (mypage == "Dashboard") {
    app.dialog.confirm('Are you sure you want logout', function () {
    // disable swipe so it is not available on login page    
    app.panel.disableSwipe("left");
    mainView.router.navigate('/index/');
    });
    
}
    
});
