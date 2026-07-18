export const ERROR_MESSAGES = {
  UNAUTHORIZED: "กรุณาเข้าสู่ระบบ",
  PROFILE_NOT_FOUND: "ไม่พบข้อมูลผู้ใช้ กรุณาตั้งค่าโปรไฟล์",
  INVALID_BODY: "รูปแบบข้อมูลไม่ถูกต้อง",
  BILL_NAME_REQUIRED: "กรุณากรอกชื่อบิล",
  MEMBERS_REQUIRED: "ต้องมีผู้เข้าร่วมอย่างน้อย 1 คน",
  MEMBER_NAME_REQUIRED: "มีผู้เข้าร่วมที่ยังไม่มีชื่อ",
  CREATE_BILL_FAILED: "สร้างบิลไม่สำเร็จ",
  SAVE_MEMBERS_FAILED: "บันทึกผู้เข้าร่วมไม่สำเร็จ",
  LOAD_PROFILE_FAILED: "ไม่สามารถโหลดข้อมูลผู้ใช้ได้",
  SAVE_PROFILE_FAILED: "บันทึกข้อมูลไม่สำเร็จ",
  DISPLAY_NAME_REQUIRED: "กรุณากรอกชื่อที่แสดง",
  DISPLAY_NAME_TOO_LONG: "ชื่อที่แสดงต้องไม่เกิน 100 ตัวอักษร",
  PROMPTPAY_NUMBER_INVALID: "เบอร์โทรต้องเป็นตัวเลข 10 หลัก ที่ขึ้นต้นด้วยเลข 0",
  LOAD_BILLS_FAILED: "ไม่สามารถโหลดรายการบิลได้",
  BILL_NOT_FOUND: "ไม่พบบิลนี้",
  LOAD_BILL_FAILED: "ไม่สามารถโหลดข้อมูลบิลได้",
  MEMBER_NOT_FOUND: "ไม่พบผู้เข้าร่วมนี้",
  UPDATE_MEMBER_FAILED: "อัปเดตสถานะไม่สำเร็จ",
  INVALID_IS_PAID: "ค่าสถานะการจ่ายไม่ถูกต้อง",
  INVALID_CLOSED: "ค่าสถานะบิลไม่ถูกต้อง",
  BILL_CLOSED: "บิลนี้ปิดรับชำระแล้ว ไม่สามารถแก้ไขสถานะการจ่ายได้",
} as const;

export const MEMBER_AMOUNT_INVALID = (name: string) => {
  return `ยอดของ "${name}" ไม่ถูกต้อง`;
};
