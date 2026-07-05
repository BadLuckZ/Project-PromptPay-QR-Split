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
} as const;

export const MEMBER_AMOUNT_INVALID = (name: string) => {
  return `ยอดของ "${name}" ไม่ถูกต้อง`;
};
