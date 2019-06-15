function reset() {
  step = 0
  console.log(step)
}
let step = 0

doHome = function () {


  const bodyTag = document.querySelector("body")
  const mainTag = document.querySelector("main")
  const nextTag = document.querySelector("div.right")
  const backTag = document.querySelector("div.left")
  const sectionTag = document.querySelector("section.one")
  const footerTag = document.querySelector("footer")
  const scrollTag = document.getElementById("scroll")

  // const scrollAn = TweenMax.to(footerTag, .5, {y:-6, ease:Power0.easeNone, yoyo:true, repeat:5, repeatDelay: .1})
  // const scrollFoot = TweenMax.to(footerTag, .3, {y:-6, ease:Power0.easeNone, yoyo:true, repeat:-1, repeatDelay: .15})



  let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }

  // Aliases
  let Application = PIXI.Application,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite;

  //Create a pixi application
  let app = new PIXI.Application({
    width: 2000,
    height: 2000,
    transparent: true,
    // antialias: true,
    // resolution: 1

  });

  app.downScroll = false
  app.upScroll = false

  //Add the canvas that Pixi automatically created for you to the html document
  // sectionTag.appendChild(app.view);

  //use array for storing images
  let image = null
  let imageSet = []
  let imageCreated = false
  // let left = 0
  let displacementImage = null
  let container = new PIXI.Container()
  let adjustmentFilter = new PIXI.filters.AdjustmentFilter({brightness: 1})

  var images = [
    "lib/Thumbnails/Sebastian-Thorsted.jpg",
    "lib/Thumbnails/Alice-Top.jpg",
    "lib/Thumbnails/Tessa.jpg",
    "lib/Thumbnails/Brian-Vu.jpg",
    "lib/Thumbnails/Forest.jpg",
    "lib/Thumbnails/Pauline-Pastry.jpg",
    "lib/Thumbnails/Archie-Taylor.jpg",
    "lib/Thumbnails/Anna-Dengbol.jpg",
    "lib/Thumbnails/Aske.jpg",
    "lib/Thumbnails/Erwan.jpg",
    "lib/Thumbnails/Taylor-Wood.jpg",
    "lib/Thumbnails/Greta.jpg",
    "lib/Thumbnails/Jasko.jpg"
  ]



  loader
    .add([
      images
    ])
    .add("displacement", "displacement3.jpg")

    app.createSprite = function() {
      imageCreated = true
      //create an image
      let image = new Sprite(resources[images[step]].texture)
      image.width = 2000;
      image.height = 2000;
      // image.x = left
      image.interactive = true
      // image.anchor.y = 0.2
      // image.anchor.x = 0.07
      image.anchor.y = -0.1

      //push created images reference into images array
      imageSet.push(image)
      container.addChild(image)
      step += 1
      // left += 40

    }

    app.removeSprite = function() {
      // imageCreated = false

      //get the last element from image array
      let image = imageSet.pop();

      container.removeChild(image)
      step -= 1

    //reset left
    // left -= 40
    }



    loader.load((loader, resources) => {
        app.stage.addChild(container)
        app.createSprite()
        displacementImage = new PIXI.Sprite(resources.displacement.texture)

        displacementImage.width = 1000
        displacementImage.height = 1000
        displacementImage.enabled = true
        displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT

        container.filters = [
        new PIXI.filters.DisplacementFilter(displacementImage, 200),
        adjustmentFilter
       ]

       app.stage.addChild(displacementImage)

       app.ticker.add(() => {
       displacementImage.x = displacementImage.x + 0.5
      })
      })


    // nextTag.addEventListener("click", function() {
    //   console.log("next")
    //   app.createSprite()
    // })
    //
    // backTag.addEventListener("click", function(event) {
    //   console.log("back")
    //   app.removeSprite()
    // })

  var lastScrollTop = 0;
  document.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
     var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
     if (st > lastScrollTop){
        app.downScroll = true
        app.upScroll = false
        console.log("down")
     } else {
        app.upScroll = true
        app.downScroll = false
        console.log("up")
     }
     lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);

// here we set the class to add only once we have scrolled the selection 0.2 percent into the viewport
inView.threshold(0.2)

  return app;

  function mod(v, l) {
    while (v < 0) {
      v += l;
    }
    return v % l;
  }

}
