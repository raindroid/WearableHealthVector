"use client"; // This is a client component 👈🏽

import { Nunito, Poppins } from "next/font/google";
import { GenBox } from "@/app/components";
import {
  Breadcrumbs,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppTheme } from "../styles/theme";
import TopBar from "../TopBar/TopBar";

const nunito = Nunito({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

interface LayoutParams {
  children: React.ReactNode;
  params: {};
}

export default function TasksLayout({
  children,
  params: {},
}: LayoutParams): React.ReactNode {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersDarkMode = false;
  const theme = useAppTheme(prefersDarkMode);
  // Media query for screens less than sm (exclusive)
  const xsOrLessScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // Media query for screens less than md (exclusive)
  const smOrLessScreen = useMediaQuery(theme.breakpoints.down("md"));
  // Media query for screens less than lg (exclusive)
  const mdOrLessScreen = useMediaQuery(theme.breakpoints.down("lg"));
  // Media query for screens less than xl (exclusive)
  const lgOrLessScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const [tempDrawerOpen, setTempDrawerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(240);

  useEffect(() => {
    if (drawerOpen) {
      setTempDrawerOpen(false);
    }
  }, [drawerOpen, tempDrawerOpen]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GenBox
        sx={{
          display: "flex",
          width: "100%",
          p: 3,
          flexDirection: "row",
          background: "#e2e2e2",
        }}
      >
        {/* <Sidenav
          lang={lang}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          drawerWidth={drawerWidth}
          setDrawerWidth={setDrawerWidth}
          tempDrawerOpen={tempDrawerOpen}
          setTempDrawerOpen={setTempDrawerOpen}
          persistDrawer={!lgOrLessScreen}
          fontClass={nunito.className}
        /> */}
        
        <GenBox
          sx={{
            display: "flex",
            background: "#e2e2e2",
            flexDirection: "column",
            position: "absolute",
            width: {
              xs: "calc(100% - 24px)",
              sm: "calc(100% - 36px)",
              md: "calc(100% - 48px)",
              // xl: `calc(100% - ${drawerWidth + 48}px)`,
            },
            right: 0,
            left: {
              xs: "12px",
              sm: "18px",
              md: "24px",
              // xl: `${drawerWidth + 24}px`,
            },

            transition: "all 275ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          }}
        >
          <TopBar
            fontClass={nunito.className}
            drawerOpen={drawerOpen}
            drawerWidth={drawerWidth}
            tempDrawerOpen={tempDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            setTempDrawerOpen={setTempDrawerOpen}
            persistDrawer={false}
          />
          <GenBox
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <GenBox
              component="main"
              sx={{ width: "100%", flexGrow: 1, pt: { sm: 2, lg: 3 } }}
            >
              {children}
            </GenBox>
          </GenBox>
        </GenBox>
      </GenBox>
    </ThemeProvider>
  );
}
