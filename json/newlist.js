let page = 0,
    imgData = null,
    isRun = false;
let onOff = true;
let allProductData = [] //全部的数据
let productData = [] //要渲染的数据
let listQuery = {
    currPage: 1,
    pageSize: 10
}

function bindHTML() {
    let oUl = document.getElementsByClassName('list')[0];
    console.log(oUl);
    let str = '';
    let data = productData;
    for (let i = 0; i < data.length; i++) {
        //  console.log(data[i].news_title);
        str += `<li class="clearfix">
  <div class="single-mode">
      <div class="bui-left clearfix">
          <img src="./img/1.jpeg" alt="">
      </div>
      <div class="single-mode-rbox clearfix ">
          <div class="title-box" id="titleBox" >
          <a href="details.html " t id="back">${data[i].news_title} 
        
          </div>
          <div class="bui-boxaa clearfix">
              <div class="bui-left ">
              <a href="" class="footer-bar-action source">${data[i].news_source}</a>
              <span class="footer-bar-action">${data[i].news_pubdate}</span>
              </div>
              <div class="none"><span>X</span></div>
              <div class="car clearfix">
                  <div class="hezi">
                      <span>不感兴趣</span>
                      <span>X</span>
                  </div>
                  <span class="head-car">X</span>
              </div>

          </div>
      </div>

  </div>

</li>
      `

    }
    oUl.innerHTML += str;
}

function queryData() {
    loading.style.display = 'block';
  //数据处理                             
    productData = allProductData.slice((listQuery.currPage - 1) * listQuery.pageSize, listQuery.currPage * listQuery.pageSize)
    listQuery.currPage++;

    // 及时更新视图
    bindHTML();
  
    console.log(productData)

}
// 拿到全部数据
function getAllData() {
   let xhr = new XMLHttpRequest();
    xhr.open('get', './json/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            allProductData = JSON.parse(xhr.responseText).RECORDS;
            // 初始化列表数据  并渲染视图
            queryData();
            // loading.style.display = 'block';
           
           }
    }
    xhr.send(null);
   
}
getAllData();

// setTimeout(() => {
//     //  debugger
//     console.log(onOff)
 
    
//     console.log(loading.style.display)
// }, 500)


window.onscroll = function () {
    // 文档内容实际高度（包括超出视窗的溢出部分）
    var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    // console.log(scrollHeight)
    //滚动条滚动距离
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop)
    //窗口可视范围高度
    var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
    // console.log(clientHeight)

    if (clientHeight + scrollTop >= scrollHeight) {
        queryData();
        if(productData.length==''){
         loading.style.display = 'none';
         load.style.display='block'
         console.log(loading.style.display)
            }
        }

        // 返回顶部
  if(window.pageYOffset >= 800){
        box.style.display = 'block';
    }else{
        box.style.display = 'none';
    }
    let timer = null;
box.onclick = function(){
    let t = window.pageYOffset;
    timer = setInterval(() => {
        t-=100;
        if(t <= 0){
            t = 0;
            clearInterval(timer);
        }
        window.scrollTo(0,t);
    }, 16.7);
}

}

function back(){
 window.location.href='details.html';

}

// let  number=1;
// let flag=true;
// $(window).scroll(function(){
//     let scrollTop = $(this).scrollTop();
//     console.log(scrollTop);
//     let scrollHeight = $(document).height();//整个文档的高度
//     console.log(scrollHeight);
    
//     let windowHeight = $(this).height(); //当浏览器窗口大小改变时,随之改变
//     console.log(windowHeight);
    
//     if(scrollTop + windowHeight == scrollHeight){       
//         if(flag){
//      $("#romvoe").html('<img style="width: 23px;margin-right:4px;" src="./img/zhuanquan.gif" alt=""/><span>loading</span>');
//         }
//     }

    
// })