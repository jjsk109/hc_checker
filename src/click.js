function downloadSCV(){
    var _ul = document.getElementById('attendance');
    var _count = document.getElementById('countdown');
    var _save_text = '';
    for(var i = 0; i < _ul.children.length;i++){
        var _enter_element = _ul.children[i].children[0].children[0].children;

        for(var j = 0; j<_enter_element.length; j++){
          
            if(j === 2){
                if(_enter_element[j].children.length > 0){
                   
                    if(_enter_element[j].children[0].checked){
                        _save_text += "출석,";
                    }else{
                        _save_text += " ,"
                    }
                    
                }else{
                    _save_text +=_enter_element[j].innerHTML + ",";
                }
                
            }else if(j === 3){
                if(_enter_element[j].innerHTML === ''){
                    _save_text += ' \r\n' ;
                }else{
                    _save_text +=_enter_element[j].innerHTML +"\r\n";
                }
               
            }else{
                _save_text +=_enter_element[j].innerHTML +",";
            }
            
        }
      
    }
    _save_text += " ,";
    _save_text += "출석인원 ,";
    _save_text += _count.children[0].children[1].innerHTML +"\r\n";

    
    var date = new Date();
    var _todate = date.getFullYear() + "_" + (date.getMonth()+1) + "_" + date.getDate() + ".csv";
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff"+_save_text], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
   
    downloadLink.href = url;
    downloadLink.download = _todate;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}

function setFirebase(){  
    var _name = document.getElementById("inputName").value;
    var _other = document.getElementById("inputOther").value;
    var _number = document.getElementById("inputNum").value;
    var _max = Number(document.getElementById("MaxCount").innerHTML) + 1;
    var number = _max;
    if(_number != ''){
        number = Number(_number);
    }
    
    const ba = {id:number, name:_name, check:'',other:_other}    
    if(_name === ''){
        return;
    }
    firebase.database().ref("/id/"+number+"/").set(ba);
    location.reload();
   
}
function removeFirebase(){
    var _number = document.getElementById("inputNum").value;
    if(_number === ''){
        return;
    }
    var number =  Number(_number);
    firebase.database().ref("/id/"+number+"/").remove();
    location.reload();
    
}

