
var car = 0;

var Request = function(ac,params,callback,method){

    car++;

    // $("#cargando").show();
    var m = "get";

    if(method!=undefined) m = method;

    $.ajax({
        url:ac,
        dataType:"json",
        data:params,
        type:m,
        success:function(res){
            callback(res);
            car--;
            if(car==0){
                // $("#cargando").fadeOut(200);
            }

        }
    });
}


