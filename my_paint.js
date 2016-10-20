$(document).ready(function() {

    var clic = true;
    var type = "brush";

    var brush_id = document.getElementById('brush');
    var row = document.getElementById('row');
    var tool = document.getElementsByClassName('type');

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

    function draw_brush(){

        canvas.removeEventListener('click', lineFunction);
        console.log("ha bon");
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';

        canvas.addEventListener('mousedown', function (e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);

            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var onPaint = function () {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
        console.log("mojo rising");
    }

    function init_tool(){

        canvas.removeEventListener('click', draw_brush);
        switch(type){
            case "brush" :  
                draw_brush();
                break;

            case 'row' :
                line();
                break;
        }
    }

    function lineFunction(e) {
        console.log('line function activated');

        if (clic) {
            console.log("premier click");
            clic = false;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
        } else {
            console.log("deuxieme click");

            clic = true;
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.closePath();
        }
    }

    function line(e) {
        remove_event();
        canvas.addEventListener('click', lineFunction);
        // e.preventDefault();
    }

    row.addEventListener('click', init_tool);
    brush_id.addEventListener('click', draw_brush);

    remove_event = function (){
        canvas.removeEventListener('click', lineFunction);
    };
});