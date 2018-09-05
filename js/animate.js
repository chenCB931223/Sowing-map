function animate(obj,target){
    clearInterval(obj.timer);
    var speed = obj.offsetLeft < target ? 15 : -15;
    obj.timer = setInterval(function(){
        var result = target - obj.offsetLeft;
        obj.style.left = obj.offsetLeft + speed + 'px';
        
        if(Math.abs(result) <= Math.abs(speed)){
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
        }
    },10);
}
