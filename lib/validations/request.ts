import { z } from "zod";

export const requestFormSchema = z.object({
  categorySlug: z.string().min(1, "대분류 카테고리를 선택해 주세요."),
  serviceItem: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(5, "제목은 5자 이상 입력해 주세요.")
    .max(60, "제목은 60자 이하로 입력해 주세요."),
  content: z
    .string()
    .trim()
    .min(10, "요청 내용은 10자 이상 입력해 주세요."),
  desiredDate: z.string().min(1, "희망 날짜를 선택해 주세요."),
  desiredTime: z.string().optional(),
  durationText: z.string().optional(),
  budgetText: z.string().optional(),
  isNegotiable: z.boolean(),
  isUrgent: z.boolean(),
  contactMethod: z.enum(["PHONE", "KAKAO"], {
    message: "연락 방법을 선택해 주세요.",
  }),
  contactValue: z.string().trim().min(1, "연락처를 입력해 주세요."),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;
