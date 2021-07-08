import List from "./list.js";

class App {
    constructor(){
        this.att = document.getElementById('attendance');
        this.set_checked = 0;
        this.check_ = [];
       
        const _list = new List;
        _list.getList(this); 
        this.setCheck_start();
        addEventListener('click',this.selectHendle.bind(this));
        addEventListener('keypless',this.selectHendle.bind(this));
        addEventListener("click",this.buttonClick);

    }
    buttonClick(e){
        if("del_button" === e.path[0].className){
            var number = e.path[0].id;
            if(confirm("정말 삭제하시겠습니까 ?") == true){
                firebase.database().ref("/id/"+number+"/").remove();
                alert("삭제되었습니다");
                location.reload();
            }
            else{
                return ;
            }


        }else if("chage_button" === e.path[0].className){
            var number = e.path[0].id;
            var _name = e.path[0].parentNode.parentNode.childNodes[2].children[0].value
            
            var _other = '';
            const ba = {id:number, name:_name, check:'',other:_other}
            firebase.database().ref("/id/"+number+"/").set(ba);
            e.path[0].parentNode.parentNode.childNodes[1].innerHTML = _name;
        }
        
    }
    selectHendle(e){
        if(e.path[0].className != 'abcd'){
            return;
        }
        
        if(e.path[0].checked){
            this.set_checked++;
        }else{
            this.set_checked--;
        }
     
        var _all_count = document.getElementById('_all_count');
        var _count = document.createTextNode(this.set_checked);
       
        _all_count.innerHTML= this.set_checked;

    }
    setCheck_start(){
        const ref = firebase.database().ref("/check/");
        ref.once("value",snapshot =>{
            var j = 0;
            if(snapshot.val() === null){
                return;
            }
            for(var i = 0; i <snapshot.val().length; i++ ){ 
                
                if(snapshot.val()[i]!=null){
                    const cb_id = document.getElementById(snapshot.val()[i].id);
                    
                    cb_id.checked = snapshot.val()[i].check;
                }
               
            }
        });
    }
 
}

window.onload = () =>{
    new App();
}