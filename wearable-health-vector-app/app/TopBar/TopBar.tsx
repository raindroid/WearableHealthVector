// "use client"; // This is a client component 👈🏽

import { GenBox, GenIconButton } from "@/app/components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { Breadcrumbs, Grid, Link, MenuList, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BiSolidHelpCircle } from "react-icons/bi";
import {
  StyledAccountMenuItem,
  StyledAppBar,
  StyledMenu,
  StyledToolBar,
  StyledTransitionIcon,
} from "./TopBar.styles";
import { getPurePath, getRoutes } from "../utils/navigation";

interface TopBarProps {
  fontClass: string;
  drawerOpen: boolean;
  tempDrawerOpen: boolean;
  drawerWidth: number;
  persistDrawer: boolean;
  setDrawerOpen: (open: boolean) => void;
  setTempDrawerOpen: (open: boolean) => void;
}

export default function TopBar({
  fontClass,
  drawerOpen,
  drawerWidth,
  tempDrawerOpen,
  persistDrawer,
  setDrawerOpen,
  setTempDrawerOpen,
}: TopBarProps) {
  const pathname = usePathname();
  const routes = getRoutes(pathname);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const router = useRouter();

  const [transparentTopBar, setTransparentTopBar] = useState(true);
  const [hovered, setHovered] = useState<null | string>(null);

  const handleAccountListOpen = (event: ReactMouseEvent<HTMLElement>) => {
    setMenu("account");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
    setAnchorEl(null);
  };

  const handleMenuMouseLeave = useCallback(
    (event: MouseEvent) => {
      if (event.clientX >= drawerWidth + 32) {
        setTempDrawerOpen(false);
        setHovered(null);
        document.removeEventListener("mousemove", handleMenuMouseLeave);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drawerWidth, drawerOpen]
  );

  // handles the case drawer width has changed
  useEffect(() => {
    if (tempDrawerOpen) {
      document.addEventListener("mousemove", handleMenuMouseLeave);
    }

    // cleanup function
    return () => {
      if (tempDrawerOpen) {
        document.removeEventListener("mousemove", handleMenuMouseLeave);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleMenuMouseLeave]);

  const handleMenuMouseEnter = () => {
    if (!drawerOpen) {
      setTempDrawerOpen(true);
      setHovered("menu-icon");
      document.addEventListener("mousemove", handleMenuMouseLeave);
    }
  };

  useEffect(() => {
    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentTopBar(window.scrollY <= 16);
    }

    /**
     The event listener that's calling the handleTransparentNavbar function when
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, []);

  return (
    <StyledAppBar
      sx={{ minHeight: 72, userSelect: "none" }}
      transparent={+transparentTopBar}
      className={fontClass}
    >
      <StyledToolBar>
        <Grid
          item
          xs={12}
          sm={"auto"}
          container
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <Grid
            item
            container
            direction="row"
            alignItems="flex-end"
            flexWrap="nowrap"
            flexGrow="1"
          >
            {!persistDrawer ? (
              <GenIconButton
                disableRipple
                sx={{
                  border: "0.5px solid darkgray",
                  marginLeft: 0,
                  marginRight: "12px",
                }}
                onClick={() => setDrawerOpen(!drawerOpen)}
                onMouseEnter={() => handleMenuMouseEnter()}
                // onMouseLeave={() => handleMenuHoverEvent(false)}
              >
                <StyledTransitionIcon
                  component={MenuIcon}
                  sx={{
                    opacity: hovered === "menu-icon" ? "0%" : "100%",
                    transform:
                      hovered === "menu-icon"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  }}
                />
                <StyledTransitionIcon
                  component={KeyboardDoubleArrowRightIcon}
                  sx={{
                    opacity:
                      !drawerOpen && hovered === "menu-icon" ? "100%" : "0%",
                    transform:
                      !drawerOpen && hovered === "menu-icon"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  }}
                />

                <StyledTransitionIcon
                  component={KeyboardDoubleArrowLeftIcon}
                  sx={{
                    opacity:
                      drawerOpen && hovered === "menu-icon" ? "100%" : "0%",
                    transform:
                      drawerOpen && hovered === "menu-icon"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  }}
                />
              </GenIconButton>
            ) : (
              <></>
            )}
            <GenBox
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Breadcrumbs
                maxItems={3}
                separator="/"
                className={fontClass}
                sx={{
                  "& svg": { fontSize: "1rem", mt: "-0.225rem" },
                  "& li a, li": { fontSize: "0.9rem", p: 0, m: 0 },
                  "& .MuiBreadcrumbs-separator": { m: "0 8px" },
                  paddingRight: "1rem"
                }}
                aria-label="breadcrumb"
              >
                <Link key={0} href={"/"} sx={{ color: "grey" }}>
                  <HomeRoundedIcon />
                </Link>
                {routes?.map((route, index) => (
                  <Link
                    key={index + 1}
                    href={index !== routes.length - 1 ? route.href : "#"}
                    color={
                      index !== routes.length - 1 ? "inherit" : "text.primary"
                    }
                    underline={index !== routes.length - 1 ? "hover" : "none"}
                  >
                    {route.title}
                  </Link>
                ))}
              </Breadcrumbs>
              <Typography
                className={fontClass}
                textTransform="capitalize"
                variant="h2"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  mt: "-8px",
                  lineHeight: "normal",
                  left: "1rem",
                }}
                color="text.primary"
              >
                {/* {routes?.at(-1)?.title} */}
                Wearable Health
              </Typography>
            </GenBox>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
            sx={{ minWidth: 112, maxWidth: "unset", width: "auto" }}
          >
            <GenIconButton disableRipple>
              <SettingsIcon />
            </GenIconButton>
            <GenIconButton disableRipple>
              <BiSolidHelpCircle />
            </GenIconButton>
            <GenIconButton
              disableRipple
              id="account-button"
              aria-controls="connection-strings-menu"
              aria-haspopup="true"
              onClick={handleAccountListOpen}
            >
              <AccountCircleIcon />
            </GenIconButton>
          </Grid>
        </Grid>
      </StyledToolBar>
      <StyledMenu
        id="account-menu"
        aria-labelledby="account-button"
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && menu === "account"}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        Noting here yet
      </StyledMenu>
    </StyledAppBar>
  );
}
