const zod = require("zod");
///
const signUpSchema = zod.object({
  firstName: zod
    .string({
      required_error: "First Name is required",
    })
    .min(4, { message: "Firstname must contain 4 characters" }),
  lastName: zod
    .string({
      required_error: "Lastname is required",
    })
    .min(4, { message: "Lastname must contain 4 characters" }),
  email: zod
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email adress" }),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password should have atleast 8 characters" }),
});
///
const sigInSchema = zod.object({
  email: zod
    .string({
      required_error: "Email address is required",
    })
    .email({ message: "Invalid email address" }),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password should have atleast 8 characters. ",
    }),
});
///
function signUpUserMiddleware(req, res, next) {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const parsed = signUpSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
  });
  if (!parsed.success) {
    res.json({
      errors: parsed.error.issues,
    });
  } else next();
}
//
function signInMiddleware(req, res, next) {
  const { email } = req.body;
  const { password } = req.body;
  const parsed = sigInSchema.safeParse({ email, password });
  if (!parsed.success)
    res.json({
      errors: parsed.error.issues,
    });
  else next();
}

module.exports = {
  signUpUserMiddleware,
  signInMiddleware,
};
