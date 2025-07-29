import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [serverResponse, setServerResponse] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await authService.login(data);
      if (res.data.isSuccess) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        setServerResponse(`✅ Xush kelibsiz, ${res.data.data.firstName}!`);
        // Redirect if needed
      } else {
        setServerResponse(`❌ Xatolik: ${res.data.errors.join(", ")}`);
      }
    } catch (err) {
      setServerResponse("⚠️ Server bilan bog‘lanib bo‘lmadi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Tizimga Kirish
        </h2>

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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {isSubmitting ? "Yuborilmoqda..." : "Kirish"}
        </button>

        {serverResponse && (
          <p className="text-center text-sm mt-2">{serverResponse}</p>
        )}
      </form>
    </div>
  );
}

// Reusable InputField component (xuddi registerdagi kabi)
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
