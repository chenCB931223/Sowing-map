$(document).ready(function(){
    var slide1 = new Slide('#box1',['images/muke1.jpg','images/muke2.jpg','images/muke3.jpg','images/muke4.jpg'])

    var $pre = $('#btn1');
    $pre.click(function(){
        slide1.go(-1);
    });
    $pre.mouseover(function(){
        slide1.stop();
    });
    $pre.mouseout(function(){
        slide1.play();
    });

    var $next = $('#btn2');
    $next.click(function(){
        slide1.go(1);
    });

    $next.mouseover(function(){
        slide1.stop();
    });

    $next.mouseout(function(){
        slide1.play();
    });
})
function Slide(box,images,duration){
    this.box = $(box);
    this.images = images; 
    this.len = this.images.length;
    var duration = duration || 2000;
    this.duration = duration;
    this.now = 0;

    this.timer = null;
    this.init();
}

Slide.prototype = {
    init : function(){
        this.creat();
        this.move();
        this.dotClass();
        this.addEven();
        this.play();
    },
    creat : function(){
        var contenBox = $('<ul class="content"></ul>');
        this.box.append(contenBox);

        var control = $('<div class="control"></div>');
        this.box.append(control);

        $.each(this.images,function(i,item){
            var $createImg = '<li><img src="' + item + '"/></li>';
            contenBox.append($createImg);

            var $createDot = '<span></span>';
            control.append($createDot);
        });
        var $list = $('.content li:first').clone();
        contenBox.append($list);
        contenBox.css('width',$list.width() * (this.len + 1));
    },

    move : function(){
        $list = $('.content');
        $item = $('.content li');
        $list.css('left',-$item.width() * this.now + 'px');
    },

    dotClass : function(){
        var $dot = $('.control span');        
        $.each($dot,function(i,j){
           if($dot[i].className == 'on'){
            $dot[i].className = ' ';
           }         
        })
        $dot[this.now % this.len].className = 'on';
    },

    go : function(step){
        var $liWidth = $('.content li').eq(1);
        this.now += step;
		$(".content").animate({'left':-$liWidth.width() * this.now});
        if(this.now == 0){

           $(".content").animate({'left':-$liWidth.width() * this.len},0);
           this.now = this.len ;
        }
        if(this.now == this.len){
            $(".content").animate({'left':0},0);
            $list.css('left','0');

            this.now = 0;
        }
        this.dotClass();
    },
    addEven : function(){
        var _this = this;
        var $dots = $('.control span');
        
        $.each($dots,function(index,elment){
            this.index = index;
            $('.control').on('click','span',function(){
                
            if(this.index == _this.now) return;
            _this.now = this.index;

            _this.dotClass();
            _this.move();
            })
        });

        _this.box.mouseover(function(){
            _this.stop();
        });

        _this.box.mouseout(function(){
            _this.play();
        });         
    },

    play : function(){
        var _this = this;
        _this.timer = setInterval(function(){
            _this.go(1);
        },_this.duration);
    },
    stop : function(){
        clearInterval(this.timer);
    }
}
