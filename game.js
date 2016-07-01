(function (global) {
    "use strict";
    // Class ------------------------------------------------
    function Game() {}

    // Header -----------------------------------------------
    global.Game = Game;
    global.Game.initGame = initGame;
    global.Game.arrow=arrow


    // ------------------------------------------------------
    var COL = 8;
    var ctx;
    var setIntv=null;
    var evented = false;
    var state = {}
    var point = {
        x: 0,
        y: 0
    }
    var init_state = {
        map: [0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 ],
        mode: 0,
        turn: 1,
        revision: 0,
        selected: {
            name: "",
            value: 0
        },
        current:28,
        arrowX:0,
        arrowY:0,
        snakeArray:[],
        oneup:null,
        point:1
    };
    
    function initGame(_ctx) {
        ctx = _ctx;
        state = objCopy(init_state);
        if (!evented) {
            evented = true;
            setEvents();
        }
        Render.render(ctx, state, point);
    }

    function setEvents() {
        $(window).keydown(function(e){
            switch (e.keyCode) {
                case 37	:
                    console.log("←")
                    if(state.arrowX==1){return}
                    state.arrowX=-1;
                    state.arrowY=0;
                    break;
                case 38	:
                    console.log("↑")
                    if(state.arrowY==1){return}
                    state.arrowX=0;
                    state.arrowY=-1;
                    break;
                case 39	:
                    console.log("→")
                    if(state.arrowX==-1){return}
                    state.arrowX=1;
                    state.arrowY=0;
                    break;
                case 40	:
                    console.log("↓")
                    if(state.arrowY==-1){return}
                    state.arrowX=0;
                    state.arrowY=1;
                    break;    
                default:
                    break;
            }
        });
        (function animloop(){
            Render.render(ctx, state, point)
            window.requestAnimationFrame(animloop);
        }());
        setIntv=setInterval(function(){
            move();
        },500)
    }
    function arrow(str){
            switch (str) {
                case "左"	:
                    console.log("←")
                    if(state.arrowX==1){return}
                    state.arrowX=-1;
                    state.arrowY=0;
                    break;
                case "上"	:
                    console.log("↑")
                    if(state.arrowY==1){return}
                    state.arrowX=0;
                    state.arrowY=-1;
                    break;
                case "右"	:
                    console.log("→")
                    if(state.arrowX==-1){return}
                    state.arrowX=1;
                    state.arrowY=0;
                    break;
                case "下"	:
                    console.log("↓")
                    if(state.arrowY==-1){return}
                    state.arrowX=0;
                    state.arrowY=1;
                    break;    
                default:
                    break;
            }    }

    function move(){
        var x = (state.current % COL | 0) ;
        var y = (state.current / COL | 0) ;
        x+=state.arrowX;
        y+=state.arrowY;
        x=Math.max(x,0)
        y=Math.max(y,0)
        x=Math.min(x,COL-1)
        y=Math.min(y,COL-1)
        state.snakeArray.push(state.current);
        state.current=y*COL+x;
        state.map=objCopy(init_state.map);
        check_oneup()
        state.snakeArray.shift();
        for(var i=0;i<state.snakeArray.length;i++){
            state.map[state.snakeArray[i]]=-1;
        }
        state.map[state.current]=1;
        state.revision+=1;
        Render.render(ctx, state, point)

        if(check_collision()){
            state=objCopy(init_state);
        }

    }
    function check_collision(){
        var x = (state.current % COL | 0) ;
        var y = (state.current / COL | 0) ;
        if(state.arrowX==-1&&x==0){return false}
        if(state.arrowX==1&&x==COL-1){return false}
        if(state.arrowY==-1&&y==0){return false}
        if(state.arrowY==1&&x==COL-1){return false}
    
        return (state.snakeArray.indexOf(state.current)!=-1);
    }
    function check_oneup(){
        if(state.oneup==null){
            state.oneup=(state.map.length*Math.random()|0)
            
            var x = (state.current % COL | 0) ;
            var y = (state.current / COL | 0) ;
            x=Math.max(x,1)
            y=Math.max(y,1)
            x=Math.min(x,COL-2)
            y=Math.min(y,COL-2)
            state.oneup=y*COL+x;

            state.map[state.oneup]=2;
            return;
        }
        if(state.current==state.oneup){
            state.snakeArray.unshift(state.snakeArray[0])
            state.oneup=(state.map.length*Math.random()|0)

            var x = (state.oneup % COL | 0) ;
            var y = (state.oneup / COL | 0) ;
            x=Math.max(x,1)
            y=Math.max(y,1)
            x=Math.min(x,COL-2)
            y=Math.min(y,COL-2)
            state.oneup=y*COL+x;

            state.point+=1;
        }
        state.map[state.oneup]=2;
    }


    function objCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

})((this || 0).self || global);
