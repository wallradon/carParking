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
  { id: 10, side: "R", full: false },
  { id: 11, side: "B", full: false },
  { id: 12, side: "B", full: false },
  { id: 13, side: "B", full: false },
  { id: 14, side: "B", full: false },
  { id: 15, side: "B", full: false }
];
//check state parking
function parkingState() {
  parkingSlots.forEach(s => {
    if (!s.full) return; //empty
    const elId = getElById(s.id); //data-id div
    renderSlot(elId, s);
  });
  countEmpty();
}
//get id El
function getElById(id) {
  const test = document.querySelector(`[data-id="${id}"]`);
  return test;
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
  const imgB = el.querySelector(".carImgB");

  if (data.full) { //add image
    if (!img && !imgB) {
      const car = document.createElement("img");
      if (data.side === "L") {
        car.src = "img/car.png";
      } else if (data.side === "R") {
        car.src = "img/carR.png";
      } else {
        car.src = "img/cartop.png";
      }

      if (data.side === "L" || data.side === "R") {
        car.className = "carImg";
      } else {
        car.className = "carImgB";
      }
      el.appendChild(car);
    }
    span?.classList.add("hidden-field"); //hidden text
  } else {
    if (img) {
      img.remove();
    } else if (imgB) {
      imgB.remove();
    }

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

document.querySelectorAll(".carL, .carR, .carB").forEach(s => {
  s.addEventListener("click", () => handleSlotClick(s))
});

function countEmpty() {
  let count = 0;
  parkingSlots.forEach(s => {
    const elId = getElById(s.id);
    if (!elId) return;
    console.log(`elId= `, Number(elId.dataset.id));
    if (elId && !s.full) {
      count++;
    }

  });
  const parkingCount = document.querySelector(".parkingCount");
  if (count > 0) {
    parkingCount.textContent = `ที่จอดรถว่าง ${count} คัน`;
  } else {
    parkingCount.textContent = `ที่จอดรถเต็ม`;
  }
}


