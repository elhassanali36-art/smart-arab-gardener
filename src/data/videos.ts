/**
 * فيديوهات تعليمية (YouTube) لكل قسم.
 * TODO(API): يمكن استبدالها لاحقاً بقناة أو مكتبة فيديو خاصة بالتطبيق.
 */

export interface GuideVideo {
  id: string;
  titleAr: string;
  titleEn: string;
}

export const hydroVideos: GuideVideo[] = [
  { id: "PIQBg2vpWnA", titleAr: "أساسيات الزراعة المائية للمبتدئين", titleEn: "Hydroponics basics for beginners" },
  { id: "3EhJgBnFm8k", titleAr: "بناء نظام DWC منزلي خطوة بخطوة", titleEn: "Build a home DWC system step by step" },
  { id: "V7RTLdkuGBM", titleAr: "نظام NFT بمواسير PVC", titleEn: "NFT system with PVC pipes" },
  { id: "H_S8AZgWmzY", titleAr: "ضبط المحلول المغذي و EC و pH", titleEn: "Nutrient solution, EC and pH control" },
];

export const verticalVideos: GuideVideo[] = [
  { id: "AZ0jCkAI9dc", titleAr: "الزراعة العمودية: المبدأ والمزايا", titleEn: "Vertical farming: idea and benefits" },
  { id: "QK2NgEjnvhE", titleAr: "صناعة عمود زراعي من PVC", titleEn: "Making a PVC growing column" },
  { id: "5U5ZLKPvNRg", titleAr: "برج زراعي للشرفات الصغيرة", titleEn: "Growing tower for small balconies" },
];

export const fodderVideos: GuideVideo[] = [
  { id: "5UkiXQq2G7Q", titleAr: "إنتاج الشعير المستنبت (أعلاف خضراء)", titleEn: "Hydroponic barley fodder production" },
  { id: "0ZTgO8ELYFE", titleAr: "زراعة البرسيم الحجازي (الalfalfa)", titleEn: "Growing alfalfa for fodder" },
  { id: "kMhrN9lXtWQ", titleAr: "الذرة العلفية: الزراعة والحش", titleEn: "Fodder maize: planting and cutting" },
];
