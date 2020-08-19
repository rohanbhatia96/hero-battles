import { object, string } from "yup";

const userRegisterSchema = object().shape({
  name: string()
    .label("name")
    .required("Name can't be empty")
    .min(2, "Name must have minimum 2 characters")
    .max(20, "Name can have a maximum of 20 characters"),
  username: string()
    .label("username")
    .required("Username can't be empty")
    .min(5, "Username must have minimum 5 characters")
    .max(12, "Username can have a maximum of 12 characters")
    .matches(/^[a-z0-9]+$/i, "Username must contain only letters and numbers"),
  email: string().label("email").email().required("Please enter a valid email"),
  password: string()
    .label("password")
    .required()
    .min(8, "Password must have at least 8 characters "),
  confirmPassword: string()
    .label("confirm-password")
    .test("passwords-match", "Passwords don't match", function (value) {
      return this.parent.password === value;
    }),
});

export default userRegisterSchema;
