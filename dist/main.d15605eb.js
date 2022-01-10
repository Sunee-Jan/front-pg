// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var tag = 0;
var $lastLi = $(".addTag");
$("body").click(function () {
  $(".close").css("display", "none");
  tag = 0;
});
var x = localStorage.getItem("x");
var newString = JSON.parse(x);
var hashMap = newString || [{
  logo: "A",
  url: "https://www.acfun.cn"
}, {
  logo: "B",
  url: "https://www.bilibili.com"
}];

var render = function render() {
  $("li:not(.addTag)").remove(), //移除add前的所有标签
  hashMap.forEach(function (item, index) {
    var $li = $("<li class=\"addChidren\">\n        <div class=\"close\">\n          <svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=\"#icon-cha\"></use>\n          </svg>\n        </div>\n        <div class=\"iconButton\">".concat(item.url[12].toUpperCase(), "\n        </div>\n        <div class=\"getUrl\">").concat(item.url.slice(12).toLowerCase(), "</div>\n        </li>"));
    $li.insertBefore($lastLi);

    if (tag === 0) {
      $(".tagList").find(".close").css("display", "none");
    } else {
      $(".tagList").find(".close").css("display", "block");
    } // PC端鼠标相关事件


    $li.mouseover(function () {
      $(".tagList").find(".close")[index].style.display = "block";
    });
    $li.mouseout(function () {
      $(".tagList").find(".close")[index].style.display = "none";
    });
    $li.on("click", function () {
      window.open(item.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      tag = 1;
      render();
    }); // 手机touch相关事件

    $li.on({
      touchstart: function touchstart() {
        console.log("1");
        timeOutEvent = setTimeout(function () {
          tag = 1; //此处为长按事件-----在此删除按钮

          render();
          console.log("2");
        }, 500);
      },
      touchmove: function touchmove() {
        console.log("3");
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        e.preventDefault();
        console.log(4);
      },
      touchend: function touchend(e) {
        console.log(5);
        clearTimeout(timeOutEvent);

        if (timeOutEvent != 0 && tag === 0) {
          window.open(item.url); //此处为点击事件----在此处添加跳转链接
        }

        console.log(6);
        return false;
      }
    });
    $li.on("touchend", ".close", function () {
      clearTimeout(timeOutEvent);

      if (timeOutEvent != 0) {
        e.stopPropagation();
        hashMap.splice(index, 1);
        tag = 1;
        render();
      } // return false;

    });
  });
};

render(); //刷新页面就执行一次移除旧标签，重新插入的过程

var lastLiEvent = function lastLiEvent() {
  if (tag === 0) {
    var url = prompt("请输入你想要的网址");

    if (url.indexOf("https") !== 0) {
      if (url.indexOf("www.") !== 0) {
        url = "https://www." + url;
      } else {
        url = "https://" + url;
      }
    }

    hashMap.push({
      logo: "".concat(url[12].toLocaleUpperCase()),
      url: "".concat(url)
    }); //每次点击add后，将新数据存入hashMap，生成新的hashMap

    render();
  }
};

$lastLi.on("click", function () {
  lastLiEvent();
});
$lastLi.on("touchend", function () {
  lastLiEvent();
});
/*
 *关闭或刷新页面前，将hashMap的数据利用JSON转换为字符串的形式存入localStorage，避免离开页面数据丢失。
 */

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d15605eb.js.map