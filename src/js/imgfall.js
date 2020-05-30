const imgfall = function(){

    console.log('imgfall initialised.');
    fallingDiv = document.getElementById('imgfall-div');

    if(parseFloat(fallingDiv.parentNode.style.height) > 0){
        fallingDiv.style.height = fallingDiv.parentNode.style.height
    }else{
        fallingDiv.style.height = '100%';
    }

    fallingDiv.style.overflow = 'hidden';
    newImages = fallingDiv.children;
    this.images = []
    Array.from(newImages).forEach(function(image){
        //image.style.position = 'absolute'
        this.images.push(new FallingImage(image, fallingDiv))
    });

    setInterval(function(){
        this.images.forEach(function (image){
            image.update(1/1000)
        })
    }, 1)

};

// max and min speeds of images as they fall
imgfall.speedMax = 1000 // in px per sec
imgfall.speedMin = 400 // in px per sec

// max and min times before images start falling
imgfall.timeMax = 15 // in sec
imgfall.timeMin = 0 // in sec

function FallingImage(domEl, parent){
    // falling image object.
    this.parent = parent.getBoundingClientRect();
    this.dom = domEl;
    this.dom.style.position = 'absolute'
    this.speed = 0;
    this.startTime = 1000 * (Math.random() * (imgfall.timeMax - imgfall.timeMin) + imgfall.timeMin) // find random start time in ms
    this.rect = domEl.getBoundingClientRect();

    this.yPos = -1 * Math.max(this.rect.height, this.rect.width);
    this.dom.style.top = this.yPos;

    this.xPos = (Math.random() * (this.parent.width - this.rect.width))
    this.dom.style.left = this.xPos + 'px';

    let speed = 0;
    setTimeout(function(){
        speed = Math.random() * (imgfall.speedMax - imgfall.speedMin) + imgfall.speedMin;
    }, this.startTime)

    this.update = function(time){
        this.speed = speed
        if(this.yPos >= window.scrollHeight){
            this.yPos = -1 * Math.max(this.rect.height, this.rect.width);
            this.xPos = (Math.random() * (this.parent.width - this.rect.width))
            speed = Math.random() * (imgfall.speedMax - imgfall.speedMin) + imgfall.speedMin;
        }else{
            this.yPos += this.speed * time;
        }

        this.dom.style.top = this.yPos + 'px'
        this.dom.style.left = this.xPos + 'px';
    };
}