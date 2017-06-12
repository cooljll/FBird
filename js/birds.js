(function() {
    "use strict";
    var Bird = function(config) {
        this.ctx = config.ctx;
        this.img = config.img;
        this.imgW = this.img.width / 3;
        this.imgH = this.img.height;
        this.x = 100;
        this.y = 100;
        this.frameIndex = 0;
        this.a = 0.0005;
        this.speed = 0;
        this.curAngle = 0;
        this.maxAngle = 45;
        this.maxSpeed = 0.3;
    }
    Bird.prototype = {
        constructor: Bird,
        draw: function(delta) {
            //设置小鸟的自由下落
            this.speed = this.speed + this.a * delta;
            this.y += this.speed * delta + 1 / 2 * this.a * Math.pow(delta, 2);
            //设置小鸟旋转
            this.curAngle = this.speed / this.maxSpeed * this.maxAngle;
            // 处理角度超过最大角度的问题：
            if (this.curAngle > this.maxAngle) {
                this.curAngle = this.maxAngle;
            } else if (this.curAngle < -this.maxAngle) {
                this.curAngle = -this.maxAngle;
            }
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(Fly.toRadian(this.curAngle));
            this.ctx.drawImage(this.img, this.imgW * this.frameIndex, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);
            this.frameIndex %= 3;
        },
        //改变速度
        changeSpeed: function(speed) {
            this.speed = speed;
        }
    }
    Fly.Bird = Bird;
})();