import ExpensesForm from "@/components/expenses-form";
import ExpensesList from "@/components/expenses-list";
import { prisma } from "@/lib/db";
import { checkAuthenticationAndMembership } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const paymentValueFromUrl = (await searchParams).payment;
  const user = await checkAuthenticationAndMembership(
    paymentValueFromUrl === "success" ? 5000 : 0
  );
  if (paymentValueFromUrl === "success") {
    return redirect("/app/dashboard");
  }

  const expenses = await prisma.expense.findMany({
    where: {
      creatorId: user.id,
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>

      <div className="w-full max-w-[600px] mx-auto">
        <ExpensesList expenses={expenses} />

        <ExpensesForm />
      </div>
    </div>
  );
}
