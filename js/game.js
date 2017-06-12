(function(Fly) {
    "use strict";
    var Game = function(config) {
        this.imgsArr = ["birds", "land", "pipe1", "pipe2", "sky"];
        this.isStart = true;
        this.curFrameTime = 0;
        this.lastFrameTime = new Date();
        this.delta = 0;
        this.roles = [];
        this.hero = null;
        this.createCanvas(config.id);
    }
    Game.prototype = {
        constructor: Game,
        start: function() {
            var that = this;
            Fly.LoadImage(that.imgsArr, function(imgList) {
                //创建对象
                that.createRole(imgList);
                // 渲染
                that.render(imgList);
                //绑定事件
                that.bindEvent();
            });
        },
        // 创建对象
        createRole: function(imgList) {
            var context = this.ctx;
            // 创建天空对象
            var imgSky = imgList.sky;
            var imgLand = imgList.land;
            var roles = this.roles;
            var i;
            for (var i = 0; i < 2; i++) {
                var sky = new Fly.Sky({
                    img: imgSky,
                    ctx: context,
                    x: i * imgSky.width
                });
                roles.push(sky);
            }
            // 创建6组管道对象
            for (i = 0; i < 6; i++) {
                var pipe = new Fly.Pipe({
                    imgTop: imgList.pipe2,
                    imgBottom: imgList.pipe1,
                    ctx: context,
                    x: 300 + i * imgList.pipe1.width * 3,
                    pipeSpace: 150
                });

                roles.push(pipe);
            }
            //创建陆地对象
            for (i = 0; i < 4; i++) {
                var land = new Fly.Land({
                    img: imgLand,
                    ctx: context,
                    x: i * imgLand.width,
                    y: imgSky.height - imgLand.height
                });
                roles.push(land);
            }
            //创建小鸟对象
            this.hero = new Fly.Bird({
                img: imgList.birds,
                ctx: context
            });
        },
        //绑定事件
        bindEvent: function() {
            var that = this;
            var cv = that.ctx.canvas;
            cv.addEventListener('click', function() {
                that.hero.changeSpeed(-0.3);
            });
        },
        // 渲染
        render: function(imgList) {
            var that = this;
            var context = that.ctx;
            var cvWidth = context.canvas.width;
            var cvHeight = context.canvas.height;
            var imgSky = imgList.sky;
            var imgLand = imgList.land;
            (function renderGame() {
                // 保存绘制状态
                context.save();
                context.beginPath(); //开启新路径
                that.curFrameTime = new Date();
                that.delta = that.curFrameTime - that.lastFrameTime;
                that.lastFrameTime = that.curFrameTime;
                // 渲染游戏中角色
                that.roles.forEach(function(role) {
                    role.draw(that.delta);
                });
                // 绘制小鸟
                that.hero.draw(that.delta);
                //碰撞检测
                if (that.hero.y <= 0 || that.hero.y >= (imgSky.height - imgLand.height) || context.isPointInPath(that.hero.x, that.hero.y)) {
                    that.isStart = false;
                }
                // 恢复状态
                context.restore();
                if (that.isStart) {
                    requestAnimationFrame(renderGame);
                }
            })();
        },
        //动态创建canvas对象
        createCanvas: function(id) {
            var cv = document.createElement("canvas");
            //给画布设置宽高,注意:不能通过样式来给画布设置宽高
            cv.height = 600;
            cv.width = 800;
            this.ctx = cv.getContext("2d");
            var container = document.getElementById(id) || document.body;
            container.appendChild(cv);
        }
    }
    Fly.Game = Game;
})(Fly);