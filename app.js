function yoshHisobla(sana) {
  let tugilgan = new Date(sana);
  let bugun = new Date();
  let yosh = bugun.getFullYear() - tugilgan.getFullYear();
  let oy = bugun.getMonth() - tugilgan.getMonth();

  if (oy < 0 || (oy === 0 && bugun.getDate() < tugilgan.getDate())) {
    yosh--;
  }
  return yosh;
}

function qoshish() {
  let ism = document.getElementById("ism").value.trim();
  let familya = document.getElementById("familya").value.trim();
  let telefon = document.getElementById("telefon").value.trim();
  let jins = document.getElementById("jins").value;
  let tugilgan = document.getElementById("tugilgan").value;
  let kun = document.getElementById("kun").value;
  let fan = document.getElementById("fan").value;

  if (!ism || !familya || !telefon || !jins || !tugilgan || !kun || !fan) {
    alert("Iltimos, barcha maydonlarni to'ldiring");
    return;
  }

  let yosh = yoshHisobla(tugilgan);

  let div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <div>
      ${ism} ${familya}  ${telefon}  ${jins}  ${tugilgan}  ${yosh} yoshi  ${kun}
    </div>
    <div class="action-btns">
      <button class="edit-btn">O'zgartirish</button>
      <button class="delete-btn">O'chirish</button>
    </div>
  `;

  div.querySelector(".delete-btn").addEventListener("click", () => {
    div.remove();
  });

  document.getElementById(fan).appendChild(div);

  document.querySelectorAll("input, select").forEach(el => el.value = "");
}