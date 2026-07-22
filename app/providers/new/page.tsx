import PreviewNotice from "@/components/common/PreviewNotice";
import ProviderForm from "@/components/forms/ProviderForm";

export default function NewProviderPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <PreviewNotice />
      <h1 className="text-2xl font-bold text-[var(--color-brown-deep)]">
        내 경험 등록하기
      </h1>
      <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
        생활 속에서 쌓아온 경험을 프로필로 등록해 보세요.
      </p>
      <div className="mt-8">
        <ProviderForm />
      </div>
    </div>
  );
}
