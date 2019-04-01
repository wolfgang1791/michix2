var socket = io();
var temp = '';
$(function () { 

    new Request("/salas", null, function (res) {

        console.log(res);
        
        $.each(res, function (k, v) {
            var it = new Sala(v);
            $('#salas .lista').append(it);
        });

    });

    $('#crear').click(()=>{
        $('#contenedor').html('');
        $('#contenedor').html(renderSala());
    });
   
});

var Sala = function(data){
    
      
    
        var html = $(`<tr>
                        <td>${data.key}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="...">
                                <form action="/unirse" method="get">
                                    <input hidden type="text" name="sala" value=${data.key}>
                                    <input type="submit" value="UNIRSE">
                                </form>
                            </div>
                        </td>
                    </tr>`
                );

        // html.find('button').click(function(){

        //     new Request("/unirse", {nombre_sala:$(this).attr('value')}, function (res) {

        //         // console.log(res);
                
        //         // $.each(res, function (k, v) {
        //         //     var it = new Sala(v);
        //         //     $('#salas .lista').append(it);
        //         // });
        //         $('#contenedor').html('');
        //         $('#contenedor').html(renderUsuario());
//        <a href="/unirse/?nombre_sala=${data.nombre_sala}"><button type="button" class="btn btn-outline-light btn-editar">UNIRSE</button></a>
        // 
        //     });
        

        // });
        return html;       
    
}
