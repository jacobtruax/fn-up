const bodyTag = document.querySelector("body")
const nextTag = document.querySelector("div.right")
const backTag = document.querySelector("div.left")
const sectionTag = document.querySelector("section.one")
const imageTag = document.querySelectorAll("article > img")
let downScroll = false
let upScroll = false

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

})

//Add the canvas that Pixi automatically created for you to the html document
sectionTag.appendChild(app.view);

//use array for storing images
let image = null
let imageSet = []
let imageCreated = false
let step = 0
// let left = 0
let displacementImage = null
let container = new PIXI.Container()
let adjustmentFilter = new PIXI.filters.AdjustmentFilter({brightness: 1})

var images = [
  "lib/book1.jpg",
  "lib/book2.jpg",
  "lib/book3.jpg",
  "lib/book4.jpg",
  "lib/book5.jpg",
  "lib/book6.jpg",
  "lib/book7.jpg",
  "lib/book8.jpg"
]


loader
  .add([
    images
  ])
  .add("displacement", "displacement3.jpg")

  const createSprite = function() {
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

  const removeSprite = function() {
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
      createSprite()
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
  //   createSprite()
  // })
  //
  // backTag.addEventListener("click", function(event) {
  //   console.log("back")
  //   removeSprite()
  // })
var lastScrollTop = 0;
document.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
 var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
 if (st > lastScrollTop){
    downScroll = true
    upScroll = false
    console.log("down")
 } else {
    upScroll = true
    downScroll = false
    console.log("up")
 }
 lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


  inView('.section')
.on('enter', section => {
  // classList.add is the same thing as jquery's .addClass()
  // this lets us add a class to something
  if(downScroll){
    createSprite()
  }

})
.on('exit', section => {
  if(upScroll){
    removeSprite()
  }
  // removeSprite()
});

// here we set the class to add only once we have scrolled the selection 0.2 percent into the viewport
inView.threshold(0.2)

VanillaTilt.init(imageTag, {
  max: 25,
  speed: 400,

});
