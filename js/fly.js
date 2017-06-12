(function(window) {
    "use strict ";
    var Fly = {};
    Fly.toRadian = function(angle) {
        return angle / 180 * Math.PI;
    }
    Fly.LoadImage = function(srcList, callback) {
        var imgObj = {},
            count = 0,
            allLength = srcList.length;
        srcList.forEach(function(srcStr) {
            var img = new Image();
            img.src = "imgs/" + srcStr + ".png";
            imgObj[srcStr] = img;
            img.onload = function() {
                count++;
                if (count >= allLength) {
                    callback(imgObj);
                }
            }
        });
    }
    window.Fly = Fly;
})(window);