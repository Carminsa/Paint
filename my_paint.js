$(document).ready(function() {

    var checkbox = false;
    var clic = true;
    var type = "brush";
    var new_color;
    var symetric = false;
    var style = false;


    var tool = document.getElementsByClassName('type');
    var color = document.getElementById('color');

    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');
    var imageLoader = document.getElementById('imageLoader');

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

    $('#style_symetric').on('change', function(){
        style = document.getElementById('style_symetric');
        init_option();
    });

    $('#symetric').change(function (){
        symetric = document.getElementById('symetric');
        init_option();
    });

    var bool;

    function init_option()
    {
        if (symetric.checked && !style.checked && !$(bool).hasClass("bool"))
        {
            console.log(2);
            $('#sketch').after("<div id='sketch_2'><canvas id='paint_2'></canvas></div>");
            var canvas_2 = $('#sketch_2');
            $(canvas_2).css('border', '1px solid gray');
            $(canvas_2).css('height', '770px');
            $(canvas_2).css('width', '100%');
            $(canvas_2).css('transform', 'scale(1, -1)');
        }

        if (symetric.checked && style.checked && !$(bool).hasClass("bool") )
        {
            console.log(1);
            document.getElementById("sketch_2").remove();
            document.getElementById('all').appendChild(
                document.getElementById('sketch'),
                document.getElementById('sketch_2')
            );

            $(sketch).css('width', '50%');
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));

            $('#sketch').after("<div id='sketch_2'><canvas id='paint_2'></canvas></div>");
            var canvas_2 = $('#sketch_2');
            var sketch_2 = $('#paint_2');
            $(sketch_2).css('height', '770px');
            $(sketch_2).css('border-left', 'none');
            $(sketch_2).css('border-top', '1px solid gray');
            $(sketch_2).css('border-bottom', '1px solid gray');
            $(sketch_2).css('border-right', '1px solid gray');
            $(canvas_2).css('transform', 'scale(-1, 1)');

            bool = $(canvas_2).addClass('bool');
        }

        if (symetric.checked === false){
            console.log(3);
            document.getElementById("sketch_2").remove();


            $("#sketch").insertAfter('#all');

            // document.getElementById('sketch').appendChild(
            //     document.getElementById('body')
            // );

        }

        if (symetric.checked && style.checked === false && $(bool).hasClass("bool"))
        {
            document.getElementById("sketch_2").remove();

            bool = $(canvas_2).removeClass('bool');
            $('#all').after("<div id='sketch_2'><canvas id='paint_2'></canvas></div>");

            var canvas_2 = $('#sketch_2');

            $(sketch).css('width', '100%');
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));

            // document.getElementById('body').appendChild(
            //     document.getElementById('sketch')
            // );

            $(canvas_2).css('border', '1px solid gray');
            $(canvas_2).css('height', '770px');
            $(canvas_2).css('width', '100%');
            $(canvas_2).css('transform', 'scale(1, -1)');
            console.log('toto');
        }

    }

    function symetric_canvas(oldCanvas) {

        if (!symetric.checked) {
            return;
        } else {

            var newCanvas = document.querySelector('#paint_2');
            var context = newCanvas.getContext('2d');

            newCanvas.width = oldCanvas.width;
            newCanvas.height = oldCanvas.height;

            context.drawImage(oldCanvas, 0, 0);

            return newCanvas;
        }
    }

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
            ctx.globalCompositeOperation = "source-over";
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            symetric_canvas(canvas);

        } else if (type === "erase") {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            symetric_canvas(canvas);
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
            symetric_canvas(canvas);
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
                symetric_canvas(canvas);
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
            var racine = Math.sqrt( (mouse.x -= axe_x) * mouse.x + (mouse.y -= axe_y) * mouse.y );
            ctx.beginPath();
            ctx.arc(axe_x, axe_y, racine , 0, 2 * Math.PI, false);
            if (checkbox.checked === true)
            {
                ctx.fillStyle = new_color;
                ctx.fill();
                ctx.stroke();
                clic = true;
                symetric_canvas(canvas);
            }else {
                ctx.stroke();
                clic = true;
                symetric_canvas(canvas);
            }
        }
    }

    $("#reset").click(function() {
        clear_canvas();

        $("#largeur_pinceau").attr("value", 5);
        width_brush = 5;
        $("#output").html("5 pixels");

    });

    function clear_canvas() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        symetric_canvas(canvas);
    }

    var button = document.getElementById('btn-download');
    button.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        button.href = dataURL;
    });

    imageLoader.addEventListener('change', handleImage, false);

    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            var dHeight = canvas.height ;
            img.onload = function(){
                img.width = canvas.width;
                img.height= canvas.height;
                ctx.drawImage(img,0,0, img.width, dHeight );
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});