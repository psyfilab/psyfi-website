import { SheetStack } from "@/lib/SheetStack";
import HomePage from "@/views/HomePage";
import StatementPage from "@/views/StatementPage";

export default function Page() {
  return (
    <main>
      <SheetStack>
        <HomePage />
        <StatementPage />
      </SheetStack>
    </main>
  );
}