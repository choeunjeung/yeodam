import { z } from "zod";

export const providerFormSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(5, "프로필 제목은 5자 이상 입력해 주세요.")
    .max(60, "프로필 제목은 60자 이하로 입력해 주세요."),
  categorySlug: z.string().min(1, "대분류 카테고리를 선택해 주세요."),
  serviceItems: z
    .array(z.string())
    .min(1, "세부 서비스를 1개 이상 선택해 주세요."),
  experienceYears: z
    .number({ message: "경험 연수를 숫자로 입력해 주세요." })
    .min(0, "경험 연수는 0 이상이어야 합니다."),
  experienceDescription: z
    .string()
    .trim()
    .min(10, "경험 설명은 10자 이상 입력해 주세요."),
  introduction: z
    .string()
    .trim()
    .min(10, "자기소개는 10자 이상 입력해 주세요."),
  contactMethod: z.enum(["PHONE", "KAKAO"], {
    message: "연락 방법을 선택해 주세요.",
  }),
  contactValue: z.string().trim().min(1, "연락처를 입력해 주세요."),
});

export type ProviderFormValues = z.infer<typeof providerFormSchema>;
