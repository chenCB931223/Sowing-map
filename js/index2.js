$(document).ready(function(){
    var slide1 = new Slide('#box1',['images/muke1.jpg','images/muke2.jpg','images/muke3.jpg','images/muke4.jpg'])

    var $pre = $('#btn1');
    $pre.stop(true,true).click(function(){
        slide1.go(-1);
    });
    $pre.mouseover(function(){
        slide1.cease();
    });
    $pre.mouseout(function(){
        slide1.play();
    });

    var $next = $('#btn2');
    $next.stop(true,true).click(function(){
        slide1.go(1);
    });

    $next.mouseover(function(){
        slide1.cease();
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
        this.dotClass();
        this.addEven();
        this.play();
    },
    creat : function(){
        var contenBox = $('<ul class="content"></ul>');

        var control = $('<div class="control"></div>');

        $.each(this.images,function(i,item){
            var $createImg = '<li><img src="' + item + '"/></li>';
            contenBox.append($createImg);

            var $createDot = '<span></span>';
            control.append($createDot);
        });
	    
	this.box.append(contenBox);
	this.box.append(control);
	    
        var $list = $('.content li').clone();
        contenBox.append($list);
        contenBox.css('width',$list.width() * (this.len * 2));
    },
	
    dotClass : function(){
	var $dot = $('.control').find('span');
        $dot.eq(this.now % this.len).addClass('on').siblings('span').removeClass('on');
    },

    go : function(step){
        var $liWidth = $('.content li').eq(1).width();
        this.now += step;
	$(".content").animate({'left':-$liWidth * this.now});
        if(this.now == 0){
           $(".content").animate({'left':-$liWidth * this.len},0);
           this.now = this.len;
        }
        if(this.now == this.len + 1){
            $(".content").animate({'left':-$liWidth},0);
            this.now = 1;
        }
        this.dotClass();
    },
    addEven : function(){
        var _this = this;
        var $dots = $('.control span');
        
        $.each($dots,function(index,elment){
            this.index = index;
            $dots.on('click',function(){     
            	if(this.index == _this.now) return;
            	_this.now = this.index;
		$('.content').css('left', -$('.content').find('li').eq(1).width() * _this.now + 'px');
            _	this.dotClass();
            })
        });

        _this.box.mouseover(function(){
            _this.cease();
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
    cease : function(){
        clearInterval(this.timer);
    }
}
