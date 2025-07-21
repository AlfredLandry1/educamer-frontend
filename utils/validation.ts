import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Requis"),
  password: Yup.string().min(6, "6 caractères minimum").required("Requis"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(2, "2 caractères minimum").required("Requis"),
  email: Yup.string().email("Email invalide").required("Requis"),
  password: Yup.string().min(6, "6 caractères minimum").required("Requis"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Requis"),
});

export const emailSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Requis"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(6, "6 caractères minimum").required("Requis"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Requis"),
}); 