let inProductData = [] //全部的数据
let product = [] //要渲染的数据
let listQuerys = {
    currPagea: 1,
    pageSizea: 10
}

     let scroll = document.querySelector('.list');
     console.log(scroll);
  
     let outerScroller = document.querySelector('.content');
     console.log(outerScroller);
     
     let touchStart = 0;
     let touchDis = 0;
     outerScroller.addEventListener('touchstart', function(event) {
         let touch = event.targetTouches[0];
         // 把元素放在手指所在的位置
         touchStart = touch.pageY;
        //  console.log(touchStart);
     }, false);

     outerScroller.addEventListener('touchmove', function(event) {
         let touch = event.targetTouches[0];
        //  console.log(touch.pageY + 'px');
         scroll.style.top = scroll.offsetTop + touch.pageY-touchStart + 'px';
        //  console.log(scroll.style.top);
         touchStart = touch.pageY;
         touchDis = touch.pageY-touchStart;
     }, false);
    //手指从屏幕上移开时触发
     outerScroller.addEventListener('touchend', function(event) {
         touchStart = 0;
         let top = scroll.offsetTop;
         console.log(top);
         if(top>60)refresh();
         if(top>0){
             let time = setInterval(function(){
                 scroll.style.top = scroll.offsetTop -2+'px';
                 if(scroll.offsetTop<=0)clearInterval(time);
             },1)
         }
     }, false);



     function refresh(){
     //这里是后台数据
        getAll();

     }
   


     function bindHTMLS() {
        let oUl = document.createElement('ul');

        console.log(oUl);
        let str = '';
        let data = product;

        for (let i = 0; i < data.length; i++) {
            //  console.log(data[i].news_title);
            str += `
            <li class="clearfix">
  <div class="single-mode">
      <div class="bui-left clearfix">
          <img src="./img/1.jpeg" alt="">
      </div>
      <div class="single-mode-rbox clearfix ">
          <div class="title-box" id="titleBox" >
          <a href="details.html " target="_blank" class="back">${data[i].news_title} 
        
          </div>
          <div class="bui-boxaa clearfix">
              <div class="bui-left ">
              <a href="javascripr:;" class="footer-bar-action source">&nbsp;${data[i].news_source}&nbsp;</a>
              <span class="footer-bar-action">&nbsp;${data[i].news_pubdate}</span>
              </div>
              <div class="car clearfix">
                 
                  <span class="head-car">X</span>
              </div>

          </div>
      </div>

  </div>

</li>
          `
    
        }
        console.log(str);
        
        oUl.innerHTML += str;
        scroll.insertBefore(oUl,scroll.firstChild);
        console.log(scroll.insertBefore(oUl,scroll.firstChild));
        
    }


     function queryDataw() { //currPagea 页码     pageSizea 条数
      //数据处理                             
      product = inProductData.slice((listQuerys.currPagea - 1) * listQuerys.pageSizea, listQuerys.currPagea * listQuerys.pageSizea)
      listQuerys.currPagea++;
        // 更新视图
        bindHTMLS();
       console.log(product)
       console.log(listQuerys.currPagea);
       
     
    } 


// 拿到全部数据

function getAll() {
    let xhr = new XMLHttpRequest();
     xhr.open('get', './json/data.json', false);
     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {
             // debugger
             inProductData = JSON.parse(xhr.responseText).RECORDS;
             // 初始化列表数据  并渲染视图
           
             
             queryDataw();
          
            
            }
     }
     xhr.send(null);
    
 }

