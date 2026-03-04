let editIndex = null;

function yoshHisobla(tugilgan){
  const tugilganDate=new Date(tugilgan);
  const bugun=new Date();
  let yosh=bugun.getFullYear()-tugilganDate.getFullYear();
  const oy=bugun.getMonth()-tugilganDate.getMonth();
  if(oy<0||(oy===0&&bugun.getDate()<tugilganDate.getDate())){
    yosh--;
  }
  return yosh;
}

function getData(){
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveData(data){
  localStorage.setItem("students", JSON.stringify(data));
}

function render(){
  const list=document.getElementById("list");
  list.innerHTML="";
  const data=getData();

  data.forEach((item,index)=>{
    const yosh=yoshHisobla(item.tugilgan);
    const tugilganDate=new Date(item.tugilgan);
    const formatted=("0"+tugilganDate.getDate()).slice(-2)+"."+
    ("0"+(tugilganDate.getMonth()+1)).slice(-2)+"."+
    tugilganDate.getFullYear();

    const div=document.createElement("div");
    div.className="row";

    div.innerHTML=`
    <div class="col">${item.fullname}</div>
    <div class="col">${item.telefon}</div>
    <div class="col">${item.jins}</div>
    <div class="col yosh">${yosh}</div>
    <div class="col">${formatted}</div>
    <div class="col kunva">${item.kun}</div>
    <div class="col kunva">${item.vaqt}</div>
    <div class="col fan">${item.fan}</div>
    <div class="col amallar">
      <button class="action-btn edit-btn">Edit</button>
      <button class="action-btn delete-btn">X</button>
    </div>
    `;

    // DELETE
    div.querySelector(".delete-btn").addEventListener("click",()=>{
      data.splice(index,1);
      saveData(data);
      render();
    });

    // EDIT
    div.querySelector(".edit-btn").addEventListener("click",()=>{
      document.getElementById("fullname").value=item.fullname;
      document.getElementById("telefon").value=item.telefon;
      document.getElementById("jins").value=item.jins;
      document.getElementById("tugilgan").value=item.tugilgan;
      document.getElementById("kun").value=item.kun;
      document.getElementById("ertalabpeshin").value=item.vaqt;
      document.getElementById("fan").value=item.fan;

      editIndex=index;
      document.getElementById("addBtn").innerText="Saqlash";
    });

    list.appendChild(div);
  });
}

document.getElementById("addBtn").addEventListener("click",function(){

const fullname=document.getElementById("fullname").value.trim();
const telefon=document.getElementById("telefon").value.trim();
const jins=document.getElementById("jins").value;
const tugilgan=document.getElementById("tugilgan").value;
const kun=document.getElementById("kun").value;
const vaqt=document.getElementById("ertalabpeshin").value;
const fan=document.getElementById("fan").value;

if(!fullname||!telefon||!jins||!tugilgan||!kun||!vaqt||!fan){
  alert("Barcha maydonlarni to'ldiring!");
  return;
}

let data=getData();

const newObj={
  fullname,
  telefon,
  jins,
  tugilgan,
  kun,
  vaqt,
  fan
};

if(editIndex===null){
  data.push(newObj);
}else{
  data[editIndex]=newObj;
  editIndex=null;
  document.getElementById("addBtn").innerText="Qo'shish";
}

saveData(data);
render();

document.querySelectorAll("input,select").forEach(el=>el.value="");

});

// Sahifa ochilganda
render();