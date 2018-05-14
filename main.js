
let $buttons = $('#buttons>button')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')

makeFakeSlides()

$slides.css({transform:'translateX(-400px)'})

bindEvents();





/******************* */
function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function bindEvents(){
    $buttons.eq(0).on('click',function(){
        if(current===2){
            //说明你是从最后一张到第一张
            $slides.css({
                transform:'translateX(-1600px)'
            })
            .one('transitionend',function(){
                $slides.hide()
                .offset()//这是小技巧，hide() show()之间插入offset()，阻断浏览器同时执行
                $slides.css({transform:'translateX(-400px)'})
                .show()
            })   
        }else{
            $slides.css({
                transform:'translateX(-400px)'
            })
        }
        current = 0;
    })
    
    $buttons.eq(1).on('click',function(){
        $slides.css({
            transform:'translateX(-800px)'
        })
        current = 1;
    })
    
    $buttons.eq(2).on('click',function(){
        if(current===0){
            //说明你是从第一张到最后一张
            $slides.css({
                transform:'translateX(0px)'
            })
            .one('transitionend',function(){
                $slides.hide()
                .offset()
                $slides.css({transform:'translateX(-1200px)'})
                .show()
            })  
            
        }else{
            $slides.css({
                transform:'translateX(-1200px)'
            })       
        }
        current = 2;
    })

}