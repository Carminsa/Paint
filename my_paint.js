$(document).ready(function() {

    var checkbox = false;
    var clic = true;
    var type = "brush";
    var new_color;

    // var brush_id = document.getElementById('brush');
    // var row = document.getElementById('row');
    var tool = document.getElementsByClassName('type');
    var color = document.getElementById('color');

    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};

    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

    }, false);

    $(tool).click(function(){
        type = $(this).data("type");
    });

    $(canvas).click(function(){
        init_tool();
    });

    function init_tool (){

        switch(type){

            case 'row':
                draw_row();
                break;

            case 'rectangle' :
                draw_retangle();
                break;

            case 'cercle' :
                draw_cercle();
                break;

            // case 'erase' :
            //     eraser();
            //     break;
        }
    }

    $(".dropdown-button").dropdown();

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    document.getElementById("color").value = "#00000";
    $(color).change(function(){
        new_color = document.getElementById("color").value = color.value;
        ctx.strokeStyle = new_color;
    });

    var width_brush = 2;
    $("#largeurs_pinceau input").change(function() {
        if (!isNaN($(this).val())) {
            width_brush = $(this).val();
            ctx.lineWidth = width_brush;
            $("#output").html($(this).val() + " pixels");
        }
    });

    $('#mycheckbox').change(function(){
        checkbox = document.getElementById('mycheckbox');
    });

    canvas.addEventListener('mousedown', function() {
        if (type === "brush" || type === "erase") {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            canvas.addEventListener('mousemove', onPaint, false);
        }
    });

    canvas.addEventListener('mouseup', function () {
        if (type === "brush"  || type === "erase"){
            canvas.removeEventListener('mousemove', onPaint, false);
        }
    }, false);

    var onPaint = function () {
        if (type === "brush") {
            console.log(ctx.globalCompositeOperation);
            ctx.globalCompositeOperation = "source-over";
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

        }else if (type === "erase") {
            console.log(ctx.globalCompositeOperation);
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    };

    function draw_row() {
        ctx.globalCompositeOperation = "source-over";
        if (clic) {
            clic = false;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
        } else {
            clic = true;
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.closePath();
        }
    }

    var x1;
    var y1;

    function draw_retangle() {
        ctx.globalCompositeOperation = "source-over";
        if (clic) {
            clic = false;
            x1 =   mouse.x;
            y1   =  mouse.y;
        } else {
            clic = true;
            var width = mouse.x -  x1;
            var height = mouse.y - y1;
            ctx.beginPath();
            ctx.rect(x1, y1, width, height);
            if (checkbox.checked === true)
            {
                ctx.fillStyle = new_color;
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }else {
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    var axe_x;
    var axe_y;

    function draw_cercle(){
        ctx.globalCompositeOperation = "source-over";
        if(clic){
            clic = false;
            axe_x = mouse.x;
            axe_y = mouse.y;
        }
        else {
            // var x = parseInt(axe_x) - parseInt(mouse.x);
            // var y = parseInt(axe_y) - parseInt(mouse.y);
            // var rayon = parseInt(x) + parseInt(y);
            // var racine = Math.abs(rayon);
            var racine = Math.sqrt( (mouse.x -= axe_x) * mouse.x + (mouse.y -= axe_y) * mouse.y );
            ctx.beginPath();
            ctx.arc(axe_x, axe_y, racine , 0, 2 * Math.PI, false);
            if (checkbox.checked === true)
            {
                ctx.fillStyle = new_color;
                ctx.fill();
                ctx.stroke();
                clic = true;
            }else {
                ctx.stroke();
                clic = true;
            }
        }
    }
    
    $("#reset").click(function() {
        // Clear canvas :
        clear_canvas();

        // Valeurs par défaut :
        $("#largeur_pinceau").attr("value", 5);
        width_brush = 5;
        $("#output").html("5 pixels");

    });

    function clear_canvas() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    var button = document.getElementById('btn-download');
    button.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        button.href = dataURL;
    });

    // $('#save').click(function(){
    //     var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    //
    //
    //     window.location.href=image
    // });
});