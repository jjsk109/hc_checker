import Env from "./env/env.js"
class List{
    constructor(){
        const env = new Env;
        const _list = env.getKey();
        const firebaseConfig = {
            apiKey: _list[0],
            authDomain: _list[1],
            projectId: _list[2],
            storageBucket: _list[3],
            messagingSenderId: _list[4],
            appId: _list[5],
            measurementId: _list[6]
        };

        firebase.initializeApp(firebaseConfig);
        
    }
    getList(t){
        const _list =[];
        const ref = firebase.database().ref("/id/");
        
        ref.once("value",snapshot =>{
            for(var i = 0; i <snapshot.val().length; i++ ){
                var name = snapshot.val()[i].name;
                var check = snapshot.val()[i].check;
                var other = snapshot.val()[i].other;
                this.setContent(t,i,name,check,other);
            }
        });
    }
    setContent(t,id,name,check,other){
       
        t._ul = document.createElement('ul');
        t._li = document.createElement('li');

        t.under_ul = document.createElement('ul');
        t.under_li = [];
        t.under_li[0] = document.createElement('li');
        t.under_li[1] = document.createElement('li');
        t.under_li[2] = document.createElement('li');
        t.under_li[3] = document.createElement('li');

        var text = [];
        text[0] = document.createTextNode(id);
        text[1] = document.createTextNode(name);
        if(check===''){
            text[2] = document.createElement('input');
            text[2].type='checkbox';
            text[2].className='abcd'
            text[2].id='a'+id;
        }else{
            text[2] = document.createTextNode(check);
        }
        
        text[3] = document.createTextNode(other);


        for(var i=0; i<text.length; i++){
            t.under_li[i].appendChild(text[i]);
            t.under_ul.appendChild( t.under_li[i]);
        }
        t._li.appendChild(t.under_ul);

        t._ul.appendChild(t._li);
        t.att.appendChild(t._ul);
        
        var _max_Count = document.getElementById("MaxCount");
      
        _max_Count.innerHTML=id;
    }
}

export default List;