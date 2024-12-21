import BaseLayout from "@/components/layout/BaseLayout";
import Entry from "@/components/landingPage/Entry";
import Functions from "@/components/landingPage/Functions";
import Reports from "@/components/landingPage/Reports";
import Mission from "@/components/landingPage/Mission";
import { Box } from "@mui/system";
import ReportForm from "./report/page";

export default function Home() {
  return (
    <BaseLayout>
      <Entry />
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          gap: { xs: 10, md: 8, lg: "17em" },
        }}
      >
        <Functions />
        <Reports />
        <Mission />
        <ReportForm />
      </Box>
    </BaseLayout>
  );
}
