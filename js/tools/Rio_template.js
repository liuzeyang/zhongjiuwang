(function(A){
    if(!A.map){
        A.map = function(fn, context){
            var arr = [];
            if(typeof fn === 'function'){
                for(var k = 0, length = this.length; k < length; k++){
                    arr.push(fn.call(context, this[k], k, this));
                }
            }
            return arr;
        }
    }
    function spl(str){
        var arr = [], last = 0, next, len = str.length, nowSymbol = '<%';
        str     = String(str);
        while(true){
            next = str.indexOf(nowSymbol, last);
            if(next != -1){
                arr.push(str.substring(last, next), nowSymbol);
                nowSymbol = nowSymbol == '<%' ? '%>' : '<%';
                last      = next + 2;
            }else{
                arr.push(str.substring(last, len));
                return arr
            }
        }
    }
    /**
     * 如果只传入一个ID号，返回一个对应模版的函数，使用返回的函数时，传入数据，可以直接生成HTML字符串
     * 如果同时传入ID号和数据，则直接返回字符串
     * @param {string} id
     * @param {object} [data]
     * @return {string, fn}
     */
    function template(id, data){
        var tempFun;
        if(!(tempFun = template[id])){   // 如果没有生成过模版函数，则生成一次
            var temp = document.getElementById(id);
            if(!temp) throw new Error('请传入一个正确ID号');

            // 生成模版
            var startCode = false,
                tempText  = spl(temp.innerHTML).map(function(v){
                    if(~v.indexOf('<%')) return (startCode = true) && '';
                    if(~v.indexOf('%>')) return (startCode = false) || '';
                    if(startCode) return v;
                    return 'html += "' + v.replace(/\s*$/mg, '')
                                          .replace(/"/g, '\'')
                                          .replace(/\n/g, '\\n"+"')
                                          .replace(/\${(.*?)}/g, '"+($1)+"') + '";'
                }).join('');

            // 生成函数
            template[id] = tempFun = new Function('data', 'var html = "";' + tempText + ';return html');
        }
        if(typeof data == 'object') return tempFun(data);
        return tempFun
    }

    if(typeof define == 'function' && define.amd && define.amd.jQuery){
        define([], function(){ return template })
    }else{
        window.template = template
    }
})(Array.prototype);