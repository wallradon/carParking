const supabaseUrl = 'https://fnuddqylpwduxucqmyrt.supabase.co'
const supabaseKey = 'sb_publishable_YnVDtC41Ra0D3OJxSf5BiQ_5u2bjSr6'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

function carIsFull(name) {
  const slots = document.querySelector(`[name="${name}"]`);
  console.log(slots.innerText);
  slots.classList.remove('available');
  slots.classList.add('occupied');
}
function carIsEmpty(name) {
  const slots = document.querySelector(`[name="${name}"]`);
  console.log(slots.innerText);
  slots.classList.remove('occupied');
  slots.classList.add('available');
}
//ดึงข้อมูล stopAreas 
async function getParks() {
  const { data, error } = await supabaseClient
    .from('stopAreas')
    .select('*');

  if (error) {
    console.error('ดึงข้อมูลไม่สำเร็จ:', error.message);
    return;
  }
  //เต็มหรือว่าง
  data.forEach(item => {
    const isStop = item.idStopArea;
    if (item.stopAreaState === true) {
      console.log(`ID: ${item.idStopArea} -> สถานะ: ว่าง (พร้อมจอด)`);
      carIsEmpty(isStop);
    } else {
      console.log(`ID: ${item.idStopArea} -> สถานะ: เต็ม`);
      carIsFull(isStop);
    }
  });
  // ข้อมูลที่ด฿งออกมา
  console.log('stopAreas:', data);
}
getParks();
setInterval(() => {
  getParks();
}, 5000); // สั่ง update ทุก 2 วิ

