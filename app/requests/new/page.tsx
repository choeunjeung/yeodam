import PreviewNotice from "@/components/common/PreviewNotice";
import RequestForm from "@/components/forms/RequestForm";

export default function NewRequestPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <PreviewNotice />
      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        도움 요청하기
      </h1>
      <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
        필요한 도움을 구체적으로 알려주시면 제공자들이 확인할 수 있어요.
      </p>
      <div className="mt-8">
        <RequestForm />
      </div>
    </div>
  );
}
