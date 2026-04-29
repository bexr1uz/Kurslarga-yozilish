let editIndex=null;

function onlyNumbers(input){
  input.value=input.value.replace(/[^0-9]/g,'');
}

function onlyLetters(input){
  input.value=input.value.replace(/[^a-zA-Z\s]/g,'');
}

function yoshHisobla(date){
  const d=new Date(date);
  const now=new Date();
  let yosh=now.getFullYear()-d.getFullYear();
  if(now.getMonth()<d.getMonth() || 
    (now.getMonth()==d.getMonth() && now.getDate()<d.getDate())){
    yosh--;
  }
  return yosh;
}

function getData(){
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveData(data){
  localStorage.setItem("students",JSON.stringify(data));
}

function render(){
  const list=document.getElementById("list");
  list.innerHTML="";
  const data=getData();

  data.forEach((item,index)=>{
    const yosh=yoshHisobla(item.tugilgan);

    const div=document.createElement("div");
    div.className="row";

    div.innerHTML=`
    <div class="col">${item.fullname}</div>
    <div class="col">${item.telefon}</div>
    <div class="col">${item.jins}</div>
    <div class="col">${yosh}</div>
    <div class="col">${item.tugilgan}</div>
    <div class="col">${item.kun}</div>
    <div class="col">${item.vaqt}</div>
    <div class="col">${item.fan}</div>
    <div class="col">
      <button class="action-btn edit-btn">Edit</button>
      <button class="action-btn delete-btn">X</button>
    </div>
    `;

    div.querySelector(".delete-btn").onclick=()=>{
      data.splice(index,1);
      saveData(data);
      render();
    };

    div.querySelector(".edit-btn").onclick=()=>{
      document.getElementById("fullname").value=item.fullname;
      document.getElementById("telefon").value=item.telefon;
      document.getElementById("jins").value=item.jins;
      document.getElementById("tugilgan").value=item.tugilgan;
      document.getElementById("kun").value=item.kun;
      document.getElementById("vaqt").value=item.vaqt;
      document.getElementById("fan").value=item.fan;

      editIndex=index;
      document.getElementById("addBtn").innerText="Saqlash";
    };

    list.appendChild(div);
  });
}

document.getElementById("addBtn").onclick=function(){

const fullname=document.getElementById("fullname").value.trim();
const telefon=document.getElementById("telefon").value.trim();
const jins=document.getElementById("jins").value;
const tugilgan=document.getElementById("tugilgan").value;
const kun=document.getElementById("kun").value;
const vaqt=document.getElementById("vaqt").value;
const fan=document.getElementById("fan").value;

if(!fullname||!telefon||!jins||!tugilgan||!kun||!vaqt||!fan){
  alert("Barcha maydonlarni to'ldiring!");
  return;
}

if(!/^[a-zA-Z\s]+$/.test(fullname)){
  alert("F.I.Sh faqat harflardan iborat!");
  return;
}

if(!/^[0-9]+$/.test(telefon)){
  alert("Telefon faqat raqam!");
  return;
}

let data=getData();

const obj={fullname,telefon,jins,tugilgan,kun,vaqt,fan};

if(editIndex===null){
  data.push(obj);
}else{
  data[editIndex]=obj;
  editIndex=null;
  document.getElementById("addBtn").innerText="Qo'shish";
}

saveData(data);
render();

// tozalash
document.querySelectorAll("input,select").forEach(el=>el.value="");
};

render();