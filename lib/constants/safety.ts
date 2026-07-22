export interface SafetyLimit {
  category: string;
  possible: string[];
  impossible: string[];
}

export const SAFETY_LIMITS: SafetyLimit[] = [
  {
    category: "병원·외출 동행",
    possible: ["접수와 이동 동행", "진료 대기", "약국 동행", "귀가 동행"],
    impossible: ["주사", "투약", "의료적 판단", "전문 간호", "의료 처치"],
  },
  {
    category: "어르신 생활지원",
    possible: [],
    impossible: ["전문 요양", "의료행위", "투약 관리", "목욕 보조", "치매 환자 단독 보호"],
  },
  {
    category: "아이 생활지원",
    possible: [],
    impossible: ["영유아 단독 돌봄", "숙박 돌봄", "의료적 돌봄", "장시간 단독 보호"],
  },
  {
    category: "반려동물 돌봄",
    possible: [],
    impossible: ["장기 임시 보호", "전문 훈련", "의료 처치", "투약 대행", "공격성이 강한 동물 돌봄"],
  },
];
