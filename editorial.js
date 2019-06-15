const doEditorial = function () {

var carousel = document.getElementById('carousel'),
    carouselCells = document.getElementById('cells'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    nextArrow = document.querySelector("a.next"),
    prevArrow = document.querySelector("a.prev");

const controlLeft = document.querySelector("div.control-left")
const controlRight = document.querySelector("div.control-right")
const infoDiv = document.querySelector("div.info-div")
const infoSection = document.querySelector("section.info")
const viewTag = document.querySelector("a.view")
const headerTag = document.querySelector("header")
const infoTag = document.querySelector("h3.infoBtn")
const backTag = document.querySelector("h3.back")
const creditsTag = document.querySelector("aside.credits")


controlRight.addEventListener("mouseover", function () {
    nextArrow.classList.remove("control-opacity")
})

controlRight.addEventListener("mouseout", function () {
    nextArrow.classList.add("control-opacity")
})

controlLeft.addEventListener("mouseover", function () {
    prevArrow.classList.remove("control-opacity")
})

controlLeft.addEventListener("mouseout", function () {
    prevArrow.classList.add("control-opacity")
})


// GSAP ===================================

TweenMax.set(infoDiv,{autoAlpha:1})
TweenMax.set(infoSection, {autoAlpha: 0})
TweenMax.set(infoTag, {autoAlpha: 1})
TweenMax.set(creditsTag, {autoAlpha: 1})
TweenMax.set(headerTag, {y: -500})

function addControlOpacity () {
  nextArrow.classList.add("control-opacity")
  prevArrow.classList.add("control-opacity")
}

addControlOpacity()

function removeControlOpacity () {
  nextArrow.classList.remove("control-opacity")
  prevArrow.classList.remove("control-opacity")
}

// const tlEditorial = new TimelineLite({paused:true, onStart:addControlOpacity, onReverseComplete:removeControlOpacity});
// tlEditorial.timeScale(2)
// tlEditorial.to(infoDiv, .4, {ease: Back.easeIn.config(.7), y: -1000})
// .to(infoSection, .8, {ease: Power4.easeIn, autoAlpha: 0}, 0)
// .to(headerTag, .5, {ease: Back.easeIn.config(.7), y: -500})
// .fromTo(creditsTag, .5, {x: -500}, {x: 0, autoAlpha: 1,}, 1)
// .fromTo(closeTag, .5, {x: 500}, {x: 0, autoAlpha: 1,}, 1)

const tlEditorial = new TimelineMax({paused:true, onComplete:removeControlOpacity, onReverseComplete:addControlOpacity}, );
tlEditorial.timeScale(1)
tlEditorial.fromTo(infoDiv, 0.5, {y: -1000}, {y: 0, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, 0.2)
.fromTo(infoSection, 0.5, {autoAlpha: 0}, {autoAlpha: 1,ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, .2)
.fromTo(headerTag, 0.5, {y: -500}, {y:0, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, .225)
// .to(creditsTag, 0.5, {x: -500, autoAlpha: 0, ease: Back.easeIn.config(.7)}, 0)
.to(infoTag, 0.4, {x: 500, autoAlpha: 0, ease: Back.easeIn.config(.7)}, 0)
.to(backTag, 0.4, {x: -500, autoAlpha: 0, ease: Back.easeIn.config(.7)}, 0)

// const tlEditorial = new TimelineLite({paused:true, onStart:addControlOpacity});
// tlEditorial.timeScale(1.9)
// tlEditorial.to(infoDiv, .4, {ease: Back.easeIn.config(.7), y: -1000})
// .to(infoSection, .4, {ease: Power4.easeIn, autoAlpha: 0}, 0)
// .to(headerTag, .4, {ease: Back.easeIn.config(.7), y: -500}, .2)

infoTag.addEventListener("click", function() {
  tlEditorial.play()
})

viewTag.addEventListener("click", function () {
  tlEditorial.reverse()
})

slide(carousel, carouselCells, prev, next);

function slide(wrapper, cells, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = cells.getElementsByClassName('cell'),
      slidesLength = slides.length,
      slideSize = cells.getElementsByClassName('cell')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;

  // Clone first and last slide
  cells.appendChild(cloneFirst);
  cells.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');

  // Mouse and Touch events
  cells.onmousedown = dragStart;

  // Touch events
  cells.addEventListener('touchstart', dragStart);
  cells.addEventListener('touchend', dragEnd);
  cells.addEventListener('touchmove', dragAction);

  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });

  function moveLeft() {
    cells.style.left = `${- slideSize}px`
  }

  moveLeft();

  // Transition events
  cells.addEventListener('transitionend', checkIndex);

  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = cells.offsetLeft;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    cells.style.left = (cells.offsetLeft - posX2) + "px";
  }

  function dragEnd (e) {
    posFinal = cells.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      cells.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    cells.classList.add('shifting');


    if (allowShift) {
      if (!action) { posInitial = cells.offsetLeft; }

      if (dir == 1) {
        cells.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == -1) {
        cells.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    };

    allowShift = false;
  }

  function checkIndex (){
    cells.classList.remove('shifting');

    if (index == -1) {
      cells.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      cells.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }

}

}
