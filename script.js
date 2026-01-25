const parkingSlots = [
  { id: 1, side: "L", full: true },
  { id: 2, side: "L", full: false },
  { id: 3, side: "L", full: false },
  { id: 4, side: "L", full: true },
  { id: 5, side: "L", full: false },
  { id: 6, side: "R", full: true },
  { id: 7, side: "R", full: false },
  { id: 8, side: "R", full: true },
  { id: 9, side: "R", full: false },
  { id: 10, side: "R", full: false }
];
//check state parking
function parkingState() {
  parkingSlots.forEach(s => {
    if (!s.full) return; //empty
    const elId = getElById(s.id); //data-id div
    console.log(elId);
    renderSlot(elId, s);
  });
  countEmpty();
}
//get id El
function getElById(id) {
  return document.querySelector(`[data-id="${id}"]`);
}
parkingState();
//เช็คค่าว่ามีไอดีนี้มั้ย
function getSlotById(id) {
  return parkingSlots.find(slot => slot.id === id); //return oject
}

function handleSlotClick(slotElement) {

  const id = Number(slotElement.dataset.id); // get id from data-id in divEl
  const slotData = getSlotById(id);

  if (!slotData) return; //ถ้าไม่เจอออก

  slotData.full = !slotData.full;
  renderSlot(slotElement, slotData); //add image
  renderSummary(); //log parkingSlots oject 
  countEmpty();
}

function renderSlot(el, data) {
  const span = el.querySelector("span");
  const img = el.querySelector(".carImg");

  if (data.full) { //add image
    if (!img) {
      const car = document.createElement("img");
      car.src = data.side === "L" ? "img/car.png" : "img/car R.png";
      car.className = "carImg";
      el.appendChild(car);
    }
    span?.classList.add("hidden-field"); //hidden text
  } else {
    img?.remove();
    span?.classList.remove("hidden-field");
  }
}

function renderSummary() {
  parkingSlots.forEach(slot => {
    console.log(
      `Parking ${slot.id} is ${slot.full ? "Full" : "Empty"}`
    );
  });
  console.log("\n");
}

document.querySelectorAll(".carL, .carR").forEach(s => {
  s.addEventListener("click", () => handleSlotClick(s))
});

function countEmpty() {
  let count = 0;
  parkingSlots.forEach(s => {
    if (!s.full) {
      count++;
    }
  });
  console.log(`Empty = ${count}`);
  const parkingCount = document.querySelector(".parkingCount");
  if (count > 0) {
    parkingCount.textContent = `ที่จอดรถว่าง ${count} คัน`;
  } else {
    parkingCount.textContent = `ที่จอดรถเต็ม`;
  }
}