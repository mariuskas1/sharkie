class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    height = 100;
    width = 100;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx){
        if(this instanceof Fish){
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        else if(this instanceof Character){
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + 60, this.y + 140, this.width - 118, this.height - 210);
            ctx.stroke();
        }
    }


    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}