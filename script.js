function updateParking() {
  const stoperR = document.querySelectorAll(".carR");
  const stoperL = document.querySelectorAll(".carL");

  stoperL.forEach(slot => {
    const name = slot.getAttribute('name');
    const haveCar = slot.querySelector('.carImg') != null;

    if (haveCar) {
      console.log(`Parking ${name} is Full`);
    } else {
      console.log(`Parking ${name} Is Empty`);
    }
  })
  console.log("\n");
  stoperR.forEach(slot => {
    const name = slot.getAttribute('name');
    const haveCar = slot.querySelector('.carImg') != null;
    if (haveCar) {
      console.log(`Parking ${name} is Full`);
    } else {
      console.log(`Parking ${name} Is Empty`);
    }
  })
}


function addCar() {
  const carimgL = document.querySelectorAll(".carL"); //เก็บข้อมูลจาก class = car
  carimgL.forEach(carIsFull => {
    carIsFull.addEventListener("click", function () {
      const existingCar = this.querySelector('.carImg'); //เก็บ .carImg ใน .carL
      const spanstate = this.querySelector('span'); //span in .carL
      if (existingCar == null) { //not have .carImg
        //add <img>
        const newCar = document.createElement("img");
        newCar.src = "img/car.png";
        newCar.className = "carImg";
        newCar.alt = "Car";
        this.appendChild(newCar); //add img in <div class='carL'>
        //add class in span
        if (spanstate) {
          spanstate.classList.add("hidden-field");
        }
        console.log(`Add car`);
        updateParking();
      } else {
        existingCar.remove();
        console.log(`Can not add car`);
        if (spanstate) {
          spanstate.classList.remove("hidden-field");
        }
      }
    });
  });

  const carimgR = document.querySelectorAll(".carR"); //เก็บข้อมูลจาก class = car
  carimgR.forEach(carIsFull => {
    carIsFull.addEventListener("click", function () {

      const existingCar = this.querySelector('.carImg');
      const spanstate = this.querySelector('span');

      if (existingCar == null) {

        const newCar = document.createElement("img");
        newCar.src = "img/car R.png";
        newCar.className = "carImg";
        newCar.alt = "Car";

        this.appendChild(newCar);

        if (spanstate) {
          spanstate.classList.add("hidden-field");
        }

        console.log(`Add car`);

        updateParking();

      } else {
        existingCar.remove();
        console.log(`Can not add car`);
        if (spanstate) {
          spanstate.classList.remove("hidden-field");
        }
      }
    });
  });

}
updateParking();
addCar()


// setInterval(() => {
//   updateParking();
// }, 2000); // สั่ง update ทุก 2 วิ

