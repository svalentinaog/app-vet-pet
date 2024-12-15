import Entry from "@/components/landingPage/Entry";
import Reports from "@/components/landingPage/Reports";
import Functions from "@/components/landingPage/Functions";
import BaseLayout from "@/components/layout/BaseLayout";
import { Box } from "@mui/system";
import Mission from "@/components/landingPage/Mission";

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
