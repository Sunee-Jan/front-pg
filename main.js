$(function () {
  let tag = 0;
  const $lastLi = $(".addTag");
  $(".mainPart").on("click", function () {
    $(".close").css("display", "none");
    tag = 0;
  });
  /*
   *打开页面读取localStorage里面的数据，并利用JSON转换为JS对象数据
   */
  const x = localStorage.getItem("x");
  const newString = JSON.parse(x);

  const hashMap = newString || [
    { logo: "A", url: "https://www.acfun.cn" },
    { logo: "B", url: "https://www.bilibili.com" },
  ];

  const render = function () {
    console.log("3:");
    $("li:not(.addTag)").remove(), //移除add前的所有标签
      /*
       *给每个hashMap的item生成一个li标签，并按顺序插在add标签前
       */
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

        $li.on("touchstart", function () {
          // 长按事件触发
          timeOutEvent = setTimeout(function () {
            timeOutEvent = 0;
            $(".tagList").find(".close").css("display", "block");
            tag = 1;
          }, 400);
        });
        $li.on("touchend", function () {
          if (tag === 0) {
            window.open(item.url);
          }
        });
        $(".close").on("touchend", function (e) {
          if (tag === 1) {
            e.stopPropagation();
            hashMap.splice(index, 1);
            console.log("2:");
            render();
            tag = 0;
          }
        });
      });
  };

  render(); //刷新页面就执行一次移除旧标签，重新插入的过程

  $lastLi.on("click", function (e) {
    let url = prompt("请输入你想要的网址");
    if (url.indexOf("https") !== 0) {
      if (url.indexOf("www.") !== 0) {
        url = "https://www." + url;
      } else {
        url = "https://" + url;
      }
    }
    hashMap.push({ logo: `${url[12].toLocaleUpperCase()}`, url: `${url}` }); //每次点击add后，将新数据存入hashMap，生成新的hashMap
    render();
  });

  /*
   *关闭或刷新页面前，将hashMap的数据利用JSON转换为字符串的形式存入localStorage，避免离开页面数据丢失。
   */
  window.onbeforeunload = function () {
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
  };
});
