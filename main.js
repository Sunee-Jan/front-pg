$(function () {
  let tag = 0;
  const $lastLi = $(".addTag");
  $("body").click(function () {
    $(".close").css("display", "none");
    tag = 0;
  });
  const x = localStorage.getItem("x");
  const newString = JSON.parse(x);

  const hashMap = newString || [
    { logo: "A", url: "https://www.acfun.cn" },
    { logo: "B", url: "https://www.bilibili.com" },
    { logo: "C", url: "https://www.acfun.cn" },
    { logo: "D", url: "https://www.bilibili.com" },
  ];

  const render = function () {
    $("li:not(.addTag)").remove(), //移除add前的所有标签
      hashMap.forEach(function (item, index) {
        let $li = $(`<li class="addChidren">
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cha"></use>
          </svg>
        </div>
        <div class="iconButton">${item.url[12].toUpperCase()}
        </div>
        <div class="getUrl">${item.url.slice(12).toLowerCase()}</div>
        </li>`);

        $li.insertBefore($lastLi);
        if (tag === 0) {
          $(".tagList").find(".close").css("display", "none");
        } else {
          $(".tagList").find(".close").css("display", "block");
        }
        // PC端鼠标相关事件
        $li.mouseover(() => {
          $(".tagList").find(".close")[index].style.display = "block";
        });
        $li.mouseout(() => {
          $(".tagList").find(".close")[index].style.display = "none";
        });
        $li.on("click", function () {
          window.open(item.url);
        });
        $li.on("click", ".close", (e) => {
          e.stopPropagation();
          hashMap.splice(index, 1);
          tag = 1;
          render();
        });

        // 手机touch相关事件
        $li.on({
          touchstart: function () {
            timeOutEvent = setTimeout(function () {
              tag = 1; //此处为长按事件-----在此删除按钮
              render();
            }, 500);
          },
          touchmove: function () {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            e.preventDefault();
          },
          touchend: function (e) {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0 && tag === 0) {
              window.open(item.url); //此处为点击事件----在此处添加跳转链接
            }
            return false;
          },
        });

        $(".close").on({
          touchstart: function (e) {},
          touchmove: function () {
            clearTimeout(timeOutEvent);
            e.preventDefault();
          },
          touchend: function (e) {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0) {
              hashMap.splice(index, 1);
              tag = 1;
              render();
            }
            return false;
          },
        });
      });
  };

  render(); //刷新页面就执行一次移除旧标签，重新插入的过程
  let lastLiEvent = function () {
    if (tag === 0) {
      let url = prompt("请输入你想要的网址");
      if (url.indexOf("https") !== 0) {
        if (url.indexOf("www.") !== 0) {
          url = "https://www." + url;
        } else {
          url = "https://" + url;
        }
      }
      hashMap.push({
        logo: `${url[12].toLocaleUpperCase()}`,
        url: `${url}`,
      }); //每次点击add后，将新数据存入hashMap，生成新的hashMap
      render();
    }
  };
  $lastLi.on("click", () => {
    lastLiEvent();
  });
  $lastLi.on("touchend", () => {
    lastLiEvent();
  });

  /*
   *关闭或刷新页面前，将hashMap的数据利用JSON转换为字符串的形式存入localStorage，避免离开页面数据丢失。
   */
  window.onbeforeunload = function () {
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
  };
});
