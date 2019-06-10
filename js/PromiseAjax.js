//使用promise封存ajax请求

function PromiseAjax(params){
    return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                //执行成功的回调函数
                resolve(this.responseText);
            }
        }
        //判断请求方式open、get或post
        if(params.method == 'get' && params.data){
            xhr.open(params.method,params.url + '?' + params.data,true);
        }else{
            xhr.open(params.method,params.url,true);
        }
        //post 请求头
        if(params.method == 'post'){
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        }
        //send
        if(params.method == 'get'){
            xhr.send(null);
        }else{
            xhr.send(params.data || '');
        }
    });
}