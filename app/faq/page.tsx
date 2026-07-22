const FAQ_ITEMS = [
  {
    q: "여담은 어떤 서비스인가요?",
    a: "생활 속에서 쌓아온 경험을 필요한 이웃과 연결하는 게시판형 서비스입니다.",
  },
  {
    q: "누가 이용할 수 있나요?",
    a: "회원가입한 누구나 제공자 프로필을 등록하거나 요청글을 작성할 수 있습니다.",
  },
  {
    q: "회원가입은 무료인가요?",
    a: "네, 회원가입과 이용은 무료입니다.",
  },
  {
    q: "서비스 이용료가 있나요?",
    a: "여담 자체는 이용료가 없습니다. 제공자와 이용자 간 사례비는 당사자끼리 직접 협의합니다.",
  },
  {
    q: "제공자는 어떻게 등록하나요?",
    a: "회원가입 후 '내 경험 등록하기'에서 카테고리와 경험, 연락처를 입력하면 됩니다.",
  },
  {
    q: "요청글은 어떻게 작성하나요?",
    a: "회원가입 후 '도움 요청하기'에서 카테고리, 날짜, 내용, 사례비를 입력하면 됩니다.",
  },
  {
    q: "연락처는 누구에게 공개되나요?",
    a: "로그인한 회원에게만 연락처가 공개되며, 목록 화면에서는 노출되지 않습니다.",
  },
  {
    q: "여담이 제공자를 직접 고용하나요?",
    a: "아니요. 여담은 이용자와 제공자가 서로를 발견하고 직접 연락하도록 돕는 연결 플랫폼입니다.",
  },
  {
    q: "본인인증이 제공되나요?",
    a: "현재는 본인인증을 제공하지 않습니다. 첫 만남은 공개된 장소에서 진행해 주세요.",
  },
  {
    q: "거래 중 문제가 생기면 어떻게 하나요?",
    a: "여담은 거래를 중개하지 않으므로 당사자 간 해결이 원칙이며, 문제가 있다면 신고하기를 이용해 주세요.",
  },
  {
    q: "신고는 어떻게 하나요?",
    a: "제공자 상세 또는 요청글 상세 화면의 '신고하기' 버튼을 눌러 사유와 내용을 제출하면 됩니다.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        자주 묻는 질문
      </h1>
      <div className="mt-6 space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.q}
            className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-4"
          >
            <summary className="cursor-pointer text-sm font-semibold text-[var(--color-brown-deep)]">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-[var(--color-brown-mid)]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
