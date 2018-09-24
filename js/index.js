window.onload = function(){
    var slide = new Slide('#box1',['images/muke1.jpg','images/muke2.jpg','images/muke3.jpg','images/muke4.jpg'])
    //左点击事件
    var pre = document.querySelector('#btn1');
    pre.addEventListener('click',function(){
        slide.go(-1);

    })  
    pre.addEventListener('mouseover',function(){
        slide.stop();
    })
    pre.addEventListener('mouseout',function(){
        slide.play();
    })
    //右点击事件
    var next = document.querySelector('#btn2');
    next.addEventListener('click',function(){
        slide.go(1);
    })
    next.addEventListener('mouseover',function(){
        slide.stop();
    })
    next.addEventListener('mouseout',function(){
        slide.play();
    }) 
};
//构造函数
function Slide(box,images,duration){    
   this.box = document.querySelector(box);
   this.images = images; 
   this.len = this.images.length;
   var duration = duration || 1500;
   this.duration = duration;
   this.now = 0;
   this.timer = null;
   this.init();
}
Slide.prototype.init = function(){
    this.creat();
    this.addEven();
    this.play();
    this.dotClass()
}
//动态创建元素
Slide.prototype.creat = function(){
    var contenBox = document.createElement('ul');
    contenBox.classList.add('content');
    this.box.appendChild(contenBox);

    var control = document.createElement('div');
    control.classList.add('control');
    this.box.appendChild(control);

    var str = '';
    var strDots = '';
    //创建图片跟小圆点
    for(var i = 0; i < this.len; i++){    
        str += '<li><img  src="' + this.images[i] + '"/></li>';   
        strDots += '<span></span>';
    }
    contenBox.innerHTML = str;
    control.innerHTML = strDots;
    
    //克隆第一张图片
    var imgs = document.querySelectorAll('li')[0];
    var imgs_f = imgs.cloneNode(true);
    contenBox.appendChild(imgs_f);
    
    //设置ul的宽度
    contenBox.style.width = imgs.offsetWidth * (this.len + 1) + 'px';
    contenBox.style.left = - imgs.offsetWidth  * this.now + 'px';
}
//获取图片位置
Slide.prototype.move = function(){
    var list = this.box.querySelector('ul');
    var item = list.querySelectorAll('li')[0].offsetWidth;

    list.style.left = - item * this.now + 'px';
}
//获取小圆点位置
Slide.prototype.dotClass = function(){ 
    var dot = this.box.querySelectorAll('span');
    var doted = dot.length;
    for(var i = 0;i < doted;i++){
        
        //给小圆点去除class
        if(dot[i].classList.contains('on')){
            dot[i].classList.remove('on');
        }       
    } 
    
    //给当前小圆点设置class
    dot[this.now % this.len ].classList.add('on');
}

//图片跳转
Slide.prototype.go = function(step){
    
    var list = this.box.querySelector('.content');
    var liWidth = list.querySelectorAll('li')[0].offsetWidth;

    this.now += step;
    
    //判断图片跳转
    if(this.now < 0){
        list.style.left = -liWidth * this.len + 'px';
         this.now = this.len - 1;
    }
    if(this.now > this.len){
        list.style.left = 0;        
       this.now = 1;
    }
    
    //动画效果
    animate(list,-liWidth * this.now);
   this.dotClass();   
}

//事件绑定
Slide.prototype.addEven = function(){
    var _this = this;
    var dots = _this.box.querySelectorAll('span');
    for(var j = 0;j < _this.len;j++){
        dots[j].index = j;
        
        //小圆点点击事件
        dots[j].addEventListener('click',function(){
            if(this.index == _this.now) return;
            _this.now = this.index;     
            _this.dotClass();
            _this.move();
        }); 
    }
    //鼠标移入事件  
    this.box.addEventListener('mouseover',function(){
        _this.stop();
    });

    //鼠标移出事件
    this.box.addEventListener('mouseout',function(){
        _this.play();
    });
}

//定时器开启 
Slide.prototype.play = function(){
    var _this = this;
   _this.timer = setInterval(function(){
       _this.go(1);
   },_this.duration);
}
//清除定时器
Slide.prototype.stop = function(){
    clearInterval(this.timer);
}

