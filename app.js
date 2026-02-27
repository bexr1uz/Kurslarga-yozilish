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

document.getElementById("addBtn").addEventListener("click",function(){

const fullname=document.getElementById("fullname").value.trim();
const telefon=document.getElementById("telefon").value.trim();
const jins=document.getElementById("jins").value;
const tugilgan=document.getElementById("tugilgan").value;
const kun=document.getElementById("kun").value;
const ertalabpeshin=document.getElementById("ertalabpeshin").value;
const fan=document.getElementById("fan").value;

if(!fullname||!telefon||!jins||!tugilgan||!kun||!ertalabpeshin||!fan){
  alert("Barcha maydonlarni to'ldiring!");
  return;
}

const yosh=yoshHisobla(tugilgan);
const tugilganDate=new Date(tugilgan);
const formatted=("0"+tugilganDate.getDate()).slice(-2)+"."+
("0"+(tugilganDate.getMonth()+1)).slice(-2)+"."+
tugilganDate.getFullYear();

const div=document.createElement("div");
div.className="row";

div.innerHTML=`
<div class="col">${fullname}</div>
<div class="col">${telefon}</div>
<div class="col">${jins}</div>
<div class="col yosh">${yosh}</div>
<div class="col">${formatted}</div>
<div class="col kunva">${kun}</div>
<div class="col kunva">${ertalabpeshin}</div>
<div class="col fan">${fan}</div>
<div class="col amallar">
<button class="action-btn edit-btn" disabled>O'zgartirish</button>
<button class="action-btn delete-btn">X</button>
</div>
`;

document.getElementById("list").appendChild(div);

div.querySelector(".delete-btn").addEventListener("click",()=>{
  div.remove();
});

document.querySelectorAll("input,select").forEach(el=>el.value="");

});