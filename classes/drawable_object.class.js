class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    height = 100;
    width = 100;
    


    /**
     * This function loads an image and creates a new Image class-object,
     * 
     * @param {string} path - It takes in the path of the image as a parameter.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This function draws an image and applies it to the context of the game-world.
     * 
     * @param {*} ctx - It takes in the context as a parameter.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function loads images out of an array create new Image objects.
     * 
     * @param {array} arr - It takes in an array of images as a parameter.
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}