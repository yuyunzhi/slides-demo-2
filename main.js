
let $buttons = $('#buttons>button')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')

makeFakeSlides()

$slides.css({transform:'translateX(-400px)'})

bindEvents();

//鼠标点击上一张下一张
$('#next').on('click',function(){
    goToSlide(current+1)
})

$('#previous').on('click',function(){
    goToSlide(current-1)
})

//计时器，自动播放，同时解决页面hidde的Bug
document.addEventListener("visibilitychange",function(e){
    if(document.hidden){
        window.clearInterval(timer)
    }else{
        timer = setInterval(function(){
            goToSlide(current+1)
        },2000)
    }
})

let timer = setInterval(function(){
    goToSlide(current+1)
},2000)

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
})

$('.container').on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlide(current+1)
    },2000)
})


/******************* */
function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function bindEvents(){
    $('#buttons').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}

function goToSlide(index){

    if(index>$buttons.length-1){
        index=0

    }else if(index<0){
        index=$buttons.length-1
    }

    if(current === $buttons.length-1 && index === 0){
        //最后一张到第一张
        $slides.css({
            transform:`translateX(${-($buttons.length+1)*400}px)`
        })
        .one('transitionend',function(){
            $slides.hide()
            .offset()//这是小技巧，hide() show()之间插入offset()，阻断浏览器同时执行
            $slides.css({transform:'translateX(-400px)'})
            .show()
        })   
    }else if(current === 0 && index === $buttons.length-1){
        //第一张到最后一张
        $slides.css({
            transform:'translateX(0px)'
        })
        .one('transitionend',function(){
            $slides.hide()
            .offset()
            $slides.css({transform:`translateX(${-(index+1)*400}px)`})
            .show()
        })  
    }else{
        $slides.css({
            transform:`translateX(${-(index+1)*400}px)`
        })
    }
    current = index
}

