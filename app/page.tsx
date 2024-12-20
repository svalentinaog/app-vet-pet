import BaseLayout from "@/components/layout/BaseLayout";
import Entry from "@/components/landingPage/Entry";
import Functions from "@/components/landingPage/Functions";
import Reports from "@/components/landingPage/Reports";
import Mission from "@/components/landingPage/Mission";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <BaseLayout>
      <Entry />
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          gap: { xs: 10, md: 4 },
        }}
      >
        <Functions />
        <Reports />
        <Mission />
      </Box>
    </BaseLayout>
  );
}