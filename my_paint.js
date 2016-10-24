$(document).ready(function() {

    var clic = true;
    var type = "brush";

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
        }
    }

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    document.getElementById("color").value = "#00000";

    $(color).change(function(e){
        var new_color = document.getElementById("color").value = color.value;
        ctx.strokeStyle = new_color;

    });


    canvas.addEventListener('mousedown', function() {
        if (type === "brush") {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            canvas.addEventListener('mousemove', onPaint, false);
        }
    });

    canvas.addEventListener('mouseup', function () {
        if (type === "brush"){
            canvas.removeEventListener('mousemove', onPaint, false);
        }
    }, false);

    var onPaint = function () {

        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };

    function draw_row() {
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
            ctx.stroke();
            ctx.closePath();
        }
    }

    var axe_x;
    var axe_y;

    function draw_cercle(){
        if(clic){
            clic = false;
            axe_x = mouse.x;
            axe_y = mouse.y;
        }
        else {
            var x = parseInt(axe_x) - parseInt(mouse.x);
            var y = parseInt(axe_y) - parseInt(mouse.y);
            var rayon = parseInt(x) + parseInt(y);
            var racine = Math.abs(rayon);

            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, racine , 0, 2 * Math.PI, false);
            ctx.stroke();
            clic = true;
        }
    }
});