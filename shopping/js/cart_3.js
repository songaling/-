window.onload = function(){
    var plus = document.getElementsByClassName("combo-plus");//获取加号按钮的元素节点
    var minus = document.getElementsByClassName("combo-minus");//获取减号按钮的元素节点
    var amounts = document.getElementsByClassName("amount"); //获取金额的元素节点
    var values = document.getElementsByClassName("combo-value");//获取输入框元素节点
    var prices = document.getElementsByClassName("price");//获取单价元素节点
    var checkboxes = document.getElementsByName("id");//全选复选框
    var total = document.getElementById("total-amount");
    var count = 0;//计数器
    var All;//总金额
    
    for (let i = 0; i < checkboxes.length; i++) {
        //为加号按钮添加点击事件
        plus[i].onclick = function(){
            values[i].value++;
            calc();
        }
        //为减号按钮添加点击事件
        minus[i].onclick = function(){
            if (values[i].value>1) {
                calc();
                values[i].value--;
            }
        }
        // values[i].onfocus = function(){
        //     console.log("获取焦点"); 
        // }
         values[i].onblur = function(){
            console.log("失去焦点"); 
            if (values[i].value>1) {
                values[i].value = parseInt(values[i].value);//取整
                calc();
            }else{
                values[i].value=1;//重置默认值
                calc();
            }
        }
        
    }
    
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].onclick = function(e){
            if (e.target.checked == true) {
                count++;
                console.log("被勾选数目增至："+count)
            }else{
                count--;
                console.log("被勾选数目增至："+count)
            }
            if (count == checkboxes.length) {
                document.getElementsByName("all")[0].checked = true;
                // alert("全选！")
            }else {
                document.getElementsByName("all")[0].checked = false;
            }
        calc();
        }
    }
    var all = document.getElementsByName("all")[0];
    all.onclick = function(e){
        if (e.target.checked) {
            for (let i = 0; i < checkboxes.length; i++) {
                count = checkboxes.length;//计数器随之更改为最大值
                checkboxes[i].checked = true;
            }
        }else{
            for (let i = 0; i < checkboxes.length; i++) {
                count = 0;//计数器清零
                checkboxes[i].checked = false;
            }
        }
        calc();
    }
  
    function calc(){
        var totalValue = 0.00;//合计变量赋值
        for (let i = 0; i < checkboxes.length; i++) {//遍历所有商品
            var price,val,amount;//单价、数量、金额
            price = prices[i].getElementsByTagName("em")[0].firstChild.nodeValue;
            val = values[i].value;
            amount = (price*val).toFixed(2);
            amounts[i].getElementsByTagName("em")[0].firstChild.nodeValue = amount;
            amount = parseFloat(amount);
            console.log("第"+i+"号商品，单价="+price+"，数量="+val+"，金额="+amount);
            if (checkboxes[i].checked) {
                totalValue += amount;
                console.log("当前合计："+totalValue);
            }
        }
        All=totalValue.toFixed(2);
        total.getElementsByTagName("em")[0].firstChild.nodeValue = All;
    }

    /****** 删除按钮效果 *****/
    var del = this.document.getElementById("cart-delete");
    var father = this.document.getElementById("cart-goods-delete");
    del.onclick = function(){
        var delgoods = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {//被勾选
                //删除对应的商品
                delgoods.push(checkboxes[i].parentElement.parentElement);//第i个商品的元素节点
                console.log(checkboxes[i].parentElement.parentElement);
            }
        }
                for (let i = 0; i <delgoods.length; i++) {
                    father.removeChild(delgoods[i]);//通过对父元素的removeChild，删除子节点
                }
                all.checked = false;
                count=0;
                total.getElementsByTagName("em")[0].firstChild.nodeValue=0.00.toFixed(2);
            }

  }
  