(function emojiCursor() {
  var possibleEmoji = [
    "Lily",
    
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var width = window.innerWidth;
  var height = window.innerHeight;
  var cursor = { x: width / 2, y: width / 2 };
  var particles = [];

  function init() {
    bindEvents();
    loop();
  }

  // Bind events that are needed
  function bindEvents() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchstart", onTouchMove);

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      for (var i = 0; i < e.touches.length; i++) {
        addParticle(
          e.touches[i].clientX,
          e.touches[i].clientY,
          possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
        );
      }
    }
  }

  function onMouseMove(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    addParticle(
      cursor.x,
      cursor.y,
      possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
    );
  }

  function addParticle(x, y, character) {
    var particle = new Particle();
    particle.init(x, y, character);
    particles.push(particle);
  }

  function updateParticles() {
    // Updated
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
    }

    //Remove dead particles
    for (var i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
  }

  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }

  /**
   * Particles
   */

   function Particle() {
    this.lifeSpan = 800; //ms
    this.initialStyles = {
      position: "absolute",
      display: "block",
      pointerEvents: "none",
      "z-index": "10000000",
      fontSize: "16px",
      "will-change": "transform",
    };

    // Init, and set properties
    this.init = function (x, y, character) {
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 1,
      };

      this.position = { x: x - 10, y: y - 20 };

      this.element = document.createElement("span");
      this.element.innerHTML = character;
      applyProperties(this.element, this.initialStyles);
      this.update();

      document.body.appendChild(this.element);
    };

    this.update = function () {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;

      this.element.style.transform =
        "translate3d(" +
        this.position.x +
        "px," +
        this.position.y +
        "px,0) scale(" +
        this.lifeSpan / 120 +
        ")";
    };

    this.die = function () {
      this.element.parentNode.removeChild(this.element);
    };
  }

  /**
   * Utils
   */

  // Applies css `properties` to an element.
  function applyProperties(target, properties) {
    for (var key in properties) {
      target.style[key] = properties[key];
    }
  }

  init();
})(); 

//Moving Soup Bowl

function leftArrowPressed() {
  var element = document.getElementById("image1");
  element.style.left = parseInt(element.style.left) - 5 + "px";
}

function rightArrowPressed() {
  var element = document.getElementById("image1");
  element.style.left = parseInt(element.style.left) + 5 + "px";
}

function moveSelection(evt) {
  switch (evt.keyCode) {
    case 37:
      leftArrowPressed();
      break;
    case 39:
      rightArrowPressed();
      break;
  }
}

function docReady() {
  window.addEventListener("keydown", moveSelection);
}


//SOUP Letters dropping 

let myLetter = "";

function startGame() {
  docReady()
  myLetter = new component(450, 50, "S");
  myLetter1 = new component(530, 35, "O");
  myLetter2 = new component(620, 42, "U");
  myLetter3 = new component(710, 40, "P");
  myLetter4 = new component(780, 35, "!");
  /*myLetter4 = new component(50, 45, "B");
  myLetter5 = new component(100, 50, "F")
  myLetter6 = new component(35, 45, "D");
  myLetter7 = new component(45, 20, "K");
  myLetter8 = new component(36, 35, "A");
  myLetter9 = new component(50, 45, "B");
  myLetter10 = new component(65, 45, "H"); */
  myGameArea.start();

}

var myGameArea = {
  canvas : document.createElement('canvas'),
  start : function() {
    this.canvas.width = 900;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
function component(x, y, letter) {
  //this.fillText("C",100,50);
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.font = "bolder 100px Comic Sans MS";
    ctx.fillStyle = "#EBBB33";
    ctx.shadowColor = "#C02C00";
    ctx.lineWidth = 5
    ctx.shadowBlur = 5;
    ctx.fillText(letter, this.x, this.y);
  }
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }
console.log(this);
}

function updateGameArea() {
  myGameArea.clear();
  myLetter.newPos();
  myLetter.update();
  myLetter1.newPos();
  myLetter1.update();
  myLetter2.newPos();
  myLetter2.update();
  myLetter3.newPos();
  myLetter3.update();
  myLetter4.newPos();
  myLetter4.update();
}



for (var i = 0; i < 40; i++) {
  var x = Math.random() * window.innerWidth;
  //var y = Math.random() * window.innerHeight; (Commented out bc we want them to fall from the top)
  /*ctx.font = "bolder 45px Comic Sans MS";
  ctx.fillStyle = "#EBBB33";
  ctx.shadowColor = "#C02C00";
  ctx.lineWidth = 5
  ctx.shadowBlur = 4;
  ctx.fillText("V",x,40); */
}

//another for loop to cycle through an array of letters? */