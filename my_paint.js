$(document).ready(function() {

    var clic = true;
    var type = "brush";

    // var brush_id = document.getElementById('brush');
    // var row = document.getElementById('row');
    var tool = document.getElementsByClassName('type');

    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var x1;
    var y1;

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
        }
    }

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';

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
});