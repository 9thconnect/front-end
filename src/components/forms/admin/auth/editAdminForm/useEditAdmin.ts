import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editAdminValidationSchema } from "./editAdminValidator";
import { useAppSelector } from "@/lib/redux/hooks";
import { IAdmin } from "@/type/users";

export function useEditAdminFormContext() {
  const admin = useAppSelector((state) => state.auth.data) as IAdmin;
  return useForm<z.infer<typeof editAdminValidationSchema>>({
    resolver: zodResolver(editAdminValidationSchema),
    defaultValues: {
      fullName: admin.fullName,
      username: admin.username,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
    },
  });
}
