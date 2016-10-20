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
        console.log(1);
        $(canvas).off( "click", "**" );
        $(canvas).off();
        canvas.removeEventListener('click', lineFunction);
        console.log(type);

        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';
        console.log(2);


        canvas.addEventListener('mousedown', function (e) {
            console.log(3);

            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            console.log(4);

            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            console.log(5);
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var onPaint = function () {
            console.log(6);
            if (type === "brush") {
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        };
    }

    function init_tool(){
        // canvas.removeEventListener('click', draw_brush);
        switch(type){
            case 'row':
                line();
                break;
        }
    }

    function lineFunction() {
        console.log(type);
        $(canvas).unbind("click");
        $(canvas).off();
        $(canvas).off( "click", "**" );
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'RED';

        if (clic) {
            $(canvas).off();
            console.log('air');
            clic = false;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
        } else {
            $(canvas).off();
            console.log('la mort');
            clic = true;
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.closePath();
        }
    }

    function line(e) {
        // remove_event();
        canvas.addEventListener('click', lineFunction);
        // e.preventDefault();
    }

    row.addEventListener('click', init_tool);
    brush_id.addEventListener('click', draw_brush);

    remove_event = function (){
        canvas.removeEventListener('click', lineFunction);
    };
});