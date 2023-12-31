let controller;
let slideScene;
let pageScene;
let mouse = document.querySelector(".cursor")
let mouseText = mouse.querySelector('span')
let burger = document.querySelector(".burger")

function animateSlides() {
  // initiate Conroller
  controller = new ScrollMagic.Controller();
  // select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  // loop over each slide
  sliders.forEach((slide,index,slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    // GSAP
    const slideTimeLine = gsap.timeline({
      defaults: { duration: 1, ease: "power.inOut" },
    });
    slideTimeLine.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTimeLine.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTimeLine.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    // create a scene

    slideScene = new ScrollMagic.Scene({
      triggerElement:slide,
      triggerHook:0.25,
      reverse:false
    })
    .setTween(slideTimeLine)
    .addIndicators({colorStart:"white",colorTrigger : "white",name:"slide"})
    .addTo(controller)

    // new animation 

    const pageTimeLine = gsap.timeline()
    let nextSlide = slides.length - 1 === index? "end":slides[index+1]
    pageTimeLine.fromTo(nextSlide,{y:"0%"},{y:"50%"})
    pageTimeLine.fromTo(slide,{opacity:1,scale:1},{opacity:0,scale:0})
    pageTimeLine.fromTo(nextSlide,{y:"50%"},{y:"0%"},"-=0.5")
    // create new scene

    pageScene = new ScrollMagic.Scene({
      triggerElement:slide,
      duration:'100%',
      triggerHook:0
    })
    .setPin(slide,{pushFollowers:false})
    .setTween(pageTimeLine)
    .addIndicators({colorStart:"cyan",colorTrigger:"cyan",name:"page",indent:200})
    .addTo(controller)
  });
}

function cursor(e){
  
  mouse.style.top = e.pageY + 'px';
  mouse.style.left = e.pageX + 'px';
}

function activeCursor(e){
const item = e.target;
  if(item.id === 'logo' || item.classList.contains('burger')){
    mouse.classList.add("nav-active");
  }else{
    mouse.classList.remove("nav-active");
  }
  if(item.classList.contains('explore')){
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe",1,{y:"0%"})
    mouseText.innerText='Tap'
  }else{
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe",1,{y:"100%"})

    mouseText.innerText=''
  }
}

function navToggle  (e) {
  if(!e.target.classList.contains("active")){
    e.target.classList.add("active")
    gsap.to(".line1",1,{rotate:"45deg",y:5,background:"black"})
  gsap.to(".line2",1,{rotate:"-45deg",y:-5,background:"black"})
  gsap.to("#logo",1,{color:"black"})
  gsap.to(".nav-bar",1,{clipPath: 'circle(2500px at 100% -10%)'})
  document.body.classList.add("hide")
  }else{
    e.target.classList.remove("active")
    gsap.to(".line1",1,{rotate:"0deg",y:5,background:"white"})
  gsap.to(".line2",1,{rotate:"0deg",y:-5,background:"white"})
  gsap.to("#logo",1,{color:"white"})
  gsap.to(".nav-bar",1,{clipPath: 'circle(50px at 100% -10%)'})
  document.body.classList.remove("hide")

  }
  
}

window.addEventListener('mousemove',cursor)
window.addEventListener("mouseover",activeCursor)
burger.addEventListener("click",navToggle)
animateSlides();
