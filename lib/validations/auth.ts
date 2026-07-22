import { z } from "zod";

export const signupFormSchema = z
  .object({
    name: z.string().trim().min(1, "이름을 입력해 주세요."),
    nickname: z.string().trim().min(2, "닉네임은 2자 이상 입력해 주세요."),
    email: z.string().trim().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 8자 이상 입력해 주세요."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해 주세요."),
    phone: z.string().trim().min(1, "연락처를 입력해 주세요."),
    agreeTerms: z.literal(true, {
      message: "이용약관에 동의해 주세요.",
    }),
    agreePrivacy: z.literal(true, {
      message: "개인정보 수집에 동의해 주세요.",
    }),
    agreeSafety: z.literal(true, {
      message: "서비스 안전 안내를 확인해 주세요.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().trim().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(1, "비밀번호를 입력해 주세요."),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
