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
    
        var disabled = '';
        if(data.jugadores.length == 2){
            disabled = 'disabled';
        }
        
        var html = $(`<tr>
                        <td>${data.key}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="...">
                                <form action="/unirse" method="get">
                                    <input hidden type="text" name="sala" value=${data.key}>
                                    <input type="submit" ${disabled} value="UNIRSE">
                                </form>
                            </div>
                        </td>
                    </tr>`
                );

  
        return html;       
    
}
