import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import { useState } from "react";
import { Mail, Lock, Phone, CalendarDays, User } from "lucide-react";

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  dateOfBirth: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Format: YYYY-MM-DD",
  }),
  phoneNumber: z.string().min(7),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [serverResponse, setServerResponse] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await authService.register(data);
      if (res.data.isSuccess) {
        setServerResponse("✅ Ro'yxatdan muvaffaqiyatli o'tildi!");
      } else {
        setServerResponse(`❌ Xato: ${res.data.errors.join(", ")}`);
      }
    } catch (err) {
      setServerResponse("⚠️ Server bilan bog'lanishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Ro‘yxatdan o‘tish
        </h2>

        <div className="flex gap-4">
          <InputField
            icon={<User />}
            placeholder="Ism"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <InputField
            icon={<User />}
            placeholder="Familiya"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <InputField
          icon={<Mail />}
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputField
          icon={<Lock />}
          type="password"
          placeholder="Parol"
          error={errors.password?.message}
          {...register("password")}
        />
        <InputField
          icon={<CalendarDays />}
          placeholder="Tug‘ilgan sana (YYYY-MM-DD)"
          error={errors.dateOfBirth?.message}
          {...register("dateOfBirth")}
        />
        <InputField
          icon={<Phone />}
          placeholder="Telefon raqam"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {isSubmitting ? "Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
        </button>

        {serverResponse && (
          <p className="text-center text-sm mt-2">{serverResponse}</p>
        )}
      </form>
    </div>
  );
}

// Reusable InputField component
import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  error?: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon, error, ...props }, ref) => {
    return (
      <div>
        <div
          className={`flex items-center gap-2 border rounded-lg px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {icon}
          <input
            {...props}
            ref={ref}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
