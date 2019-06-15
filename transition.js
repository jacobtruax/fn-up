let editorialExcist = false

var homePage = Barba.BaseView.extend({
  namespace: 'homepage',
  initialized: false,
  onEnter: function() {
    // reset();

  // Scroll Button ==========================================
    const scrollTag = document.getElementById("scroll")
    const mainTag = document.querySelector("main")

    var scrollAn = new TimelineMax();

  scrollAn.fromTo(scrollTag, .8, {
    y:"+=5"
  }, {
    y:"-=10",
    yoyo:true,
    repeat:5,
    repeatDelay: 0.05
  })
  .delay(3)
  .repeatDelay(3)
  .repeat(-1);

  // document.addEventListener("scroll", function() {
  //   scrollTag.style.visibility = "hidden"
  // })

  },

  onEnterCompleted: function() {

    if (!this.initialized) {
      this.app = doHome();
      this.initialized = true;
    }

    let app = this.app;

    const sectionTag = document.querySelector("section.one");
    sectionTag.appendChild(this.app.view);

    var lastScrollTop = 0;

    // const articles = document.querySelectorAll("article")
    //
    // document.addEventListener("scroll", function() {
    //   const pixels = window.pageYOffset
    //
    //   // const pageHeight = bodyTag.getBoundingClientRec().pageHeight
    //
    //   articles.forEach(article => {
    //     if(articles.offSetTop - 400 <= pixels){
    //       if(app.downScroll){
    //             app.createSprite()
    //         }
    //     }
    //   })
    //
    // })

    inView('.section')
      .on('enter', section => {
        // classList.add is the same thing as jquery's .addClass()
        // this lets us add a class to something
        console.log('enter', section);
        if(app.downScroll){
          app.createSprite()
        }

      })
      .on('exit', section => {
        if(app.upScroll){
          app.removeSprite()
        }
        // removeSprite()
      });

      VanillaTilt.init(document.querySelectorAll("article > figure"), {
      		max: 19,
      		speed: 300,
          scale: 1.02
      	});


  },
  onLeave: function() {
      // A new Transition toward a new page has just started.
  },
  onLeaveCompleted: function() {
    // sectionTag.appendChild(app.view);
  }
});

var editorialPage = Barba.BaseView.extend({
  namespace: 'editorialpage',
  initialized: false,
  onEnter: function() {
  },
  onEnterCompleted: function() {
    // if (!this.initialized) {
    //   doEditorial();
    //   this.initialized = true;
    // }
    doEditorial()
    editorialExcist = true
  },
  onLeave: function() {
      // A new Transition toward a new page has just started.
  },
  onLeaveCompleted: function() {
    editorialExcist = false
      // The Container has just been removed from the DOM.
  }
});

var wordsPage = Barba.BaseView.extend({
  namespace: 'wordspage',
  initialized: false,
  onEnter: function() {
  },
  onEnterCompleted: function() {
    // if (!this.initialized) {
    //   doEditorial();
    //   this.initialized = true;
    // }
    doWords()
  },
  onLeave: function() {
      // A new Transition toward a new page has just started.
  },
  onLeaveCompleted: function() {
      // The Container has just been removed from the DOM.
  }
});


// Don't forget to init the view!
homePage.init();
editorialPage.init();
wordsPage.init();

Barba.Pjax.start();

var transitionAnimation = Barba.BaseTransition.extend({
  start: function() {

    Promise
      .all([this.newContainerLoading, this.startTransition()])
      .then(this.fadeIn.bind(this));
  },

  startTransition: function() {

    var transitionPromise = new Promise(function(resolve) {

  var outTransition = new TimelineMax();

  const infoTag = document.querySelector("h3.infoBtn")
  const backTag = document.querySelector("h3.back")



    TweenMax.set(".loader",{autoAlpha:0})

    outTransition
    .set(".color-wipe", {display: "block", y: "0%"})
    .staggerFromTo(".color-wipe", .8, {y: "0%"}, {y: "-100%", ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, 0)
    .to(".header", .5, {y: -500, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, 0.3)

    .to(".loader", .1, {autoAlpha: 0, onComplete: function(){$('html, body').animate({ scrollTop: 0 }, 'fast'), resolve();}})

    .staggerFromTo(".color-wipe", .7, {y: "-100%"}, {y: "-200%", ease: Power4.easeIn}, 0)
      .set("color-wipe", {display: "none"})

      if(editorialExcist){
        console.log("happy")
        TweenMax.to(infoTag, .5, {delay: .2, y: -500, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, 0.3)
        TweenMax.to(backTag, .5, {delay: .2, y: -500, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")}, 0.3)
      }
  });

    return transitionPromise

  },

  fadeIn: function() {

    var _this = this;
    var $el = $(this.newContainer);

        TweenMax.set($(this.oldContainer), {display: "none"});
        TweenMax.fromTo(".loader", 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0})
        TweenMax.to($el, 0.1, {opacity: 1, onComplete: function(){
          _this.done();}
        });
        // TweenMax.fromTo(".header", 1, {y: -200}, {y:0, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")})
        // TweenMax.from(".info-div", 1, {y:-0, ease: CustomEase.create("custom", "M0,0 C0.25,0 0.302,0.067 0.338,0.102 0.418,0.18 0.466,0.292 0.498,0.502 0.532,0.73 0.586,0.88 0.64,0.928 0.679,0.962 0.698,1 1,1")})

  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return transitionAnimation;
};
