export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 9) return "09********";
  return phone.slice(0, 4) + "***" + phone.slice(-3);
}

export function sanitizeChatMessage(message: string): { cleanText: string; isLeaked: boolean } {
  // Regex phát hiện số điện thoại (10-11 số), kể cả cách nhau hoặc có dấu chấm
  const phoneRegex = /(0[3|5|7|8|9])[0-9.\s]{8,11}/g;
  const keywordRegex = /(zalo|sdt|số đt|gọi riêng|đi ngoài|ck riêng|chuyển khoản riêng|bỏ sàn)/gi;

  if (phoneRegex.test(message) || keywordRegex.test(message)) {
    return {
      cleanText: "[THÔNG TIN ĐÃ ĐƯỢC ẨN ĐỂ BẢO VỆ GIAO DỊCH TRÊN SÀN]",
      isLeaked: true,
    };
  }
  return { cleanText: message, isLeaked: false };
}
