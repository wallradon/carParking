// 1. ตั้งค่าการเชื่อมต่อ (ใส่ URL และ Anon Key ของน้อง)
const supabaseUrl = 'https://fnuddqylpwduxucqmyrt.supabase.co'
const supabaseKey = 'sb_publishable_YnVDtC41Ra0D3OJxSf5BiQ_5u2bjSr6'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
// --- 1. Supabase Initialization ---
// อย่าลืมใส่ URL และ KEY ของตัวเองตรงนี้นะครับ ไม่งั้นจะ Error
// const { createClient } = supabase
// const supabaseClient = createClient('YOUR_URL', 'YOUR_KEY')

// ==========================================
// Tab 1: เพิ่มสวนใหม่ (New Park)
// ==========================================
const parkForm = document.getElementById('parkForm');

if (parkForm) {
  parkForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameValue = document.getElementById('parkNameInput').value;
    const countValue = parseInt(document.getElementById('parkCountInput').value);

    await insertParkWithMultipleStops(nameValue, countValue);

    parkForm.reset();
  });
}

async function insertParkWithMultipleStops(name, count) {
  // 1. สร้างสวน
  const { data: newPark, error: parkError } = await supabaseClient
    .from('park')
    .insert([{ namePark: name }])
    .select()
    .single();

  if (parkError) {
    console.error('Error creating park:', parkError.message);
    alert('Error creating park: ' + parkError.message);
    return;
  }

  const parkId = newPark.idPark;

  // 2. สร้าง Array ช่องจอด
  const stopAreasToInsert = [];
  for (let i = 0; i < count; i++) {
    stopAreasToInsert.push({
      idPark: parkId,
      stopAreaState: true
    });
  }

  // 3. บันทึกช่องจอด
  const { error: stopError } = await supabaseClient
    .from('stopAreas')
    .insert(stopAreasToInsert);

  if (stopError) {
    console.error('Error creating slots:', stopError.message);
    alert('บันทึกสวนสำเร็จ แต่บันทึกจุดจอดไม่สำเร็จ');
  } else {
    alert(`บันทึกสวน ${name} พร้อมจุดจอด ${count} แห่ง เรียบร้อยแล้ว!`);
  }
}

// ==========================================
// Tab 2: เพิ่มช่องจอดเดิม (Append Slots)
// ==========================================
const appendForm = document.getElementById('appendForm');

if (appendForm) {
  appendForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const targetParkId = parseInt(document.getElementById('existingParkIdInput').value);
    const addCount = parseInt(document.getElementById('appendCountInput').value);

    // 1. เช็คว่ามีสวนนี้จริงไหม
    const { data: parkCheck, error: checkError } = await supabaseClient
      .from('park')
      .select('idPark, namePark')
      .eq('idPark', targetParkId)
      .single();

    if (checkError || !parkCheck) {
      alert('ไม่พบ Park ID นี้ในระบบ กรุณาตรวจสอบเลข ID');
      return;
    }

    const newSlots = [];
    for (let i = 0; i < addCount; i++) {
      newSlots.push({
        idPark: targetParkId,
        stopAreaState: true
      });
    }

    // 3. บันทึก
    const { error: insertError } = await supabaseClient
      .from('stopAreas')
      .insert(newSlots);

    if (insertError) {
      console.error('Insert Error:', insertError.message);
      alert('เกิดข้อผิดพลาดในการเพิ่มช่องจอด');
    } else {
      alert(`สำเร็จ! เพิ่มช่องจอดจำนวน ${addCount} ช่อง ให้กับ "${parkCheck.namePark}" (ID: ${targetParkId}) แล้ว`);
      appendForm.reset();
    }
  });
}

// ==========================================
// Tab 3: แก้ไขสถานะ (Update Status)
// ==========================================
const updateSlotForm = document.getElementById('updateSlotForm');

if (updateSlotForm) {
  updateSlotForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const slotId = parseInt(document.getElementById('slotIdInput').value);
    const stateValue = document.getElementById('slotStateInput').value;
    const isAvailable = (stateValue === 'true');

    const { data, error } = await supabaseClient
      .from('stopAreas')
      .update({ stopAreaState: isAvailable })
      .eq('idStopArea', slotId)
      .select();

    if (error) {
      console.error('Update Error:', error.message);
      alert('เกิดข้อผิดพลาด: ' + error.message);
    } else if (!data || data.length === 0) {
      alert('ไม่พบรหัสช่องจอดนี้ในระบบ (Update ไม่สำเร็จ)');
    } else {
      const statusText = isAvailable ? "ว่าง (Available)" : "เต็ม (Occupied)";
      alert(`อัปเดตช่องจอด ID ${slotId} เป็นสถานะ "${statusText}" เรียบร้อยแล้ว!`);
      document.getElementById('slotIdInput').value = '';
    }
  });
}