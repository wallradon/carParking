function updateParking() {
  const stoper = document.querySelectorAll(".car");

  stoper.forEach(slot => {

    const name = slot.getAttribute('name');
    const haveCar = slot.querySelector('.carImg') != null;
    if (haveCar) {
      console.log(`Parking ${name} is Full`);
    } else {
      console.log(`Parking ${name} Is Empty`);
    }
  })
}
updateParking()
const carimg = document.querySelectorAll(".car");
carimg.forEach(carIsFull => {
  carIsFull.addEventListener("click", function () {

    const existingCar = this.querySelector('.carImg');

    if (existingCar == null) {
      const newCar = document.createElement("img");
      newCar.src = "img/car.png";
      newCar.className = "carImg";
      newCar.alt = "Car";
      this.appendChild(newCar);
      console.log(`Add car`);
    } else {
      existingCar.remove();
      console.log(`Can not add car`);

    }
  });
});


setInterval(() => {
  updateParking();
}, 5000); // สั่ง update ทุก 2 วิ

