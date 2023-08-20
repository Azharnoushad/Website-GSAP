let controller;
let slideScene;

function animateSlides() {
  // initiate Conroller
  controller = new ScrollMagic.Controller();
  // select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  // loop over each slide
  sliders.forEach((slide) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    // GSAP
    const slideTimeLine = gsap.timeline({
      defaults: { duration: 1, ease: "power.inOut" },
    });
    slideTimeLine.fromTo(revealImg,{x:'0%'},{x:'100%'});
    slideTimeLine.fromTo(img,{scale:2},{scale:1},"-=1");
    slideTimeLine.fromTo(revealText,{x:'0%'},{x:'100%'},"-=0.75");
    slideTimeLine.fromTo(nav,{y:'-100%'},{y:'0%'},'-=0.5')
  });
}
animateSlides();
