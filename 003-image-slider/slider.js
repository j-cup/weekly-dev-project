window.addEventListener("load", function(){
    // our code here
    let slides = document.getElementsByClassName("slide")
    let slideCount = slides.length
    let prev = document.querySelector(".prev")
    let next = document.querySelector(".next")
    let position = 0
    let hijacked = false;
  
    slides[slideCount - 1].classList.add("left");
    slides[0].classList.add("active");
    slides[1].classList.add("right");

    let nextValue = (direction, currentValue, size) => {
        if((currentValue == 0) && (direction == "prev")){
          return size-1
        }
        if(currentValue == (size-1) && (direction == "next")){
          return 0
        }
        if(direction == "prev"){
          return currentValue-1
        }
        if(direction == "next"){
          return currentValue+1
        }
    }
   
    let shiftLeft = () => {
        slides[position].classList.remove("active")
        slides[position].classList.add("left")
    
        position = nextValue("next", position, slideCount)
    
        slides[position].classList.add("active")
        slides[position].classList.remove("right")
    
        slides[nextValue("next", position, slideCount)].classList.remove("left")
        slides[nextValue("next", position, slideCount)].classList.add("right")
      }
    
    let shiftRight = () => {
        slides[position].classList.remove("active")
        slides[position].classList.add("right")

        position = nextValue("prev", position, slideCount)

        slides[position].classList.add("active")
        slides[position].classList.remove("left")

        slides[nextValue("prev", position, slideCount)].classList.remove("right")
        slides[nextValue("prev", position, slideCount)].classList.add("left")
    }

    document.addEventListener("keydown", function(event){
        if(!hijacked){
          if(event.key == "ArrowLeft"){
            hijacked = true
            shiftRight()
            setTimeout(function(){
              hijacked = false
            }, 500)
          }
          if(event.key == "ArrowRight"){
            hijacked = true
            shiftLeft()
            setTimeout(function(){
              hijacked = false
            }, 500)
          }
        }
    })
    
    prev.addEventListener("click", function(event){
        if(!hijacked){ 
          hijacked = true
          shiftRight()
          setTimeout(function(){
            hijacked = false
          }, 500)
        }
    })
    
      next.addEventListener("click", function(event){
        if(!hijacked){ 
          hijacked = true
          shiftLeft()
          setTimeout(function(){
            hijacked = false
          }, 500)
        }
    })
    
});
  