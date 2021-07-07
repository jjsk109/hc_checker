import List from "./list.js";

class App {
    constructor(){
        this.att = document.getElementById('attendance');
        this.set_checked = 0;
        
       
        const _list = new List;
        _list.getList(this); 
        
      
        addEventListener('click',this.selectHendle.bind(this));
        addEventListener('keypless',this.selectHendle.bind(this));
        
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
 
}

window.onload = () =>{
    new App();
}