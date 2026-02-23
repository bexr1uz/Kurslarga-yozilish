function qoshish() {
  let ism = document.getElementById("ism").value.trim();
  let familya = document.getElementById("familya").value.trim();
  let kun = document.getElementById("kun").value;
  let fan = document.getElementById("fan").value;

  if (!ism || !familya || !kun || !fan) {
    alert("Iltimos, barcha maydonlarni to'ldiring");
    return;
  }

  let div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    Ism: ${ism}<br>
    Familya: ${familya}<br>
    Kuni: ${kun}
    <div class="action-btns">
      <button class="edit-btn" title="O'zgartirish">O'zgartirish</button>
      <button class="delete-btn" title="O'chirish">O'chirish</button>
    </div>
  `;

  div.querySelector(".delete-btn").addEventListener("click", () => {
    div.remove();
  });

  document.getElementById(fan).appendChild(div);

  document.getElementById("ism").value = "";
  document.getElementById("familya").value = "";
  document.getElementById("kun").value = "";
  document.getElementById("fan").value = "";
}