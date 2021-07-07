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
        // t = this, id key,name 이름,check 출석여부, other 비고
        t._ul = document.createElement('ul');
        t._li = document.createElement('li');

        t.under_ul = document.createElement('ul');

        // li 테그 추가 0 번호, 1 이름, 2 체크박스, 3 비고,  4 수정버튼, 5 삭제버튼,
        t.under_li = [];
        t.under_li[0] = document.createElement('li');
        t.under_li[1] = document.createElement('li');
        t.under_li[2] = document.createElement('li');
        t.under_li[3] = document.createElement('li');
        t.under_li[4] = document.createElement('li');
        t.under_li[5] = document.createElement('li');
        t.under_li[6] = document.createElement('li');

        var text = [];
        text[0] = document.createTextNode(id);
        text[1] = document.createTextNode(name);
        text[2] = document.createElement('input');
        text[2].type = 'text'
        text[2].value = name;
        t.under_li[2].className = "setName";
        if(check===''){
            text[3] = document.createElement('input');
            text[3].type='checkbox';
            text[3].className='abcd'
            text[3].id='a'+id;
        }else{
            text[3] = document.createTextNode(check);
        }
        
        
        text[4] = document.createTextNode(other);
        text[5] = document.createElement("BUTTON");
        text[6] = document.createElement("BUTTON");


        text[5].innerHTML="수정";
        t.under_li[5].className="change";
        text[6].innerHTML="삭제";
        t.under_li[6].className="delete";
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