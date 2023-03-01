$(function(){
// 收获用户输入的关键字
document.querySelector('#search-input').addEventListener('keyup', function(){
    // console.log('123')
    var searchInput=$('#search-input').val().trim()
    // console.log(searchInput)
    if(searchInput.length<=0){
        // return searchInput.value('')
        return $('.showlist').empty().hide()
    }
    
      // searchGet(searchInput)
      // 优先从缓存中寻找，若缓存中能找到值，则不再进行防抖动计时函数
      if(Cacheobj[searchInput]){
        return tplshowlistfunc(Cacheobj[searchInput])
      }

      // 添加防抖函数
      // 先清除定时器
      clearTimeout(timer)

      debounceFunc(searchInput)
    
})

// 封装函数，获取搜索返回值
function searchGet(keywords){
   $.ajax({
    // 制定请求的url地址，其中，q是用户输入的关键字
    url:'https://suggest.taobao.com/sug?q='+keywords,
    // 制定要发起的JSONP请求
    dataType: 'jsonp',

    // 成功后的回调函数
    success: function(res){
        // console.log(res)
        // 返回的函数要存储到对象中，然后遍历，再打印出来到网页
        tplshowlistfunc(res)

        // console.log(res.result)
        // console.log(res)
        // console.log(result)
        // console.log(res.result[0])

      //  var Cacheobj={}

      
    }
   }) 
}

// 定义渲染模板结构的函数
function tplshowlistfunc(res){
    // console.log(res)
    
  if(res.result.length<=0){
    return $('.showlist').empty().hide()
    // console.log('1')
  }
  
  //  先检查浏览器中是否有已经查询过的函数
  // console.log(res)
  var k = $('#search-input').val().trim()
    Cacheobj[k]=res

  var htmlstr=template('tpl-showlist', res)
// console.log(htmlstr)
  $('.showlist').html(htmlstr).show()
}


// 防抖函数，减少访问次数，节约请求资源
var timer=null
function debounceFunc(searchInput){
    timer=setTimeout(function(){
      searchGet(searchInput)
    }, 800)
}

// 缓存函数，将查询过的信息存储到浏览器中
var Cacheobj={}
function caches(res){
   console.log('cache')
  for( var k in res){
    //  console.log()
    
  }
}
})


