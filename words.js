const doWords = function () {

const infoDiv = document.querySelector("div.info-div")
const infoSection = document.querySelector("section.info")
const viewTag = document.querySelector("a.view")
const headerTag = document.querySelector("header")
const infoTag = document.querySelector("h3.infoBtn")
const backTag = document.querySelector("h3.back")
const creditsTag = document.querySelector("aside.credits")


// GSAP ===================================

TweenMax.set(infoDiv,{autoAlpha:1})
TweenMax.set(infoSection, {autoAlpha: 0})
TweenMax.set(infoTag, {autoAlpha: 1})
TweenMax.set(creditsTag, {autoAlpha: 1})
TweenMax.set(headerTag, {y: -500})

const tlEditorial = new TimelineMax({paused:true}, );
tlEditorial.timeScale(1)
tlEditorial.fromTo(infoDiv, 0.5, {y: -1000}, {y: 0, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, 0.2)
.fromTo(infoSection, 0.5, {autoAlpha: 0}, {autoAlpha: 1,ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, .2)
.fromTo(headerTag, 0.5, {y: -500}, {y:0, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, .225)

.to(infoTag, 0.4, {x: 500, autoAlpha: 0, ease: Back.easeIn.config(.7)}, 0)
.to(backTag, 0.4, {x: -500, autoAlpha: 0, ease: Back.easeIn.config(.7)}, 0)

infoTag.addEventListener("click", function() {
  tlEditorial.play()
})

viewTag.addEventListener("click", function () {
  tlEditorial.reverse()
})


}
