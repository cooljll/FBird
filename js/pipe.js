(function(Fly) {
    "use strict";
    var Pipe = function(config) {
        this.imgTop = config.imgTop;
        this.imgBottom = config.imgBottom;
        this.ctx = config.ctx;
        this.x = config.x;
        this.pipeSpace = config.pipeSpace;
        this.imgW = this.imgTop.width;
        this.imgH = this.imgBottom.height;
        // 随机生成管道高度
        this.topY = 0;
        this.bottomY = 0;
        this.speed = 0.1;
        this.initPipeHeight();
    }
    Pipe.prototype = {
        constructor: Pipe,
        draw: function(delta) {
            this.x -= this.speed * delta;
            if (this.x <= -this.imgW * 3) {
                this.x += this.imgW * 3 * 6;
                this.initPipeHeight();
            }
            //为每一个管道描绘路径
            this.ctx.rect(this.x, this.topY, this.imgW, this.imgH);
            this.ctx.rect(this.x, this.bottomY, this.imgW, this.imgH);
            // this.ctx.fill();
            this.ctx.drawImage(this.imgTop, this.x, this.topY);
            this.ctx.drawImage(this.imgBottom, this.x, this.bottomY);
        },
        //初始化管道高度
        initPipeHeight: function() {
            this.pipeHeight = Math.random() * 200 + 50;
            this.bottomY = this.pipeHeight + this.pipeSpace;
            this.topY = this.pipeHeight - this.imgH;
        }
    }
    Fly.Pipe = Pipe;
})(Fly);