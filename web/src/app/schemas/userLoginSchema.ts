import { object, string } from "yup";

const userLoginSchema = object().shape({
  email: string().label("email").email().required("Please enter a valid email"),
  password: string()
    .label("password")
    .required()
    .min(8, "Password must have at least 8 characters "),
});

export default userLoginSchema;
