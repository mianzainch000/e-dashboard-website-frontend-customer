import Cookies from "js-cookie";
import DrawerComp from "../Drawer";
import React, { useState } from "react";
import logo from "../../Images/logo.png";
import ThemeToggle from "../ToogleTheme";
import DeleteModal from "../DeleteModal";
import styles from "./styles.module.css";
import { useSnackbar } from "../Snackbar";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  AppBar,
  Button,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const snackBarMessage = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAuthenticated = !!Cookies.get("token"); // Check if token exists

  const handleLogout = async () => {
    setLoading(true);
    try {
      Cookies.remove("token");
      snackBarMessage({
        message: "Logout Successfully",
        type: "success",
      });
      navigate("/");
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: "Logout Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="sticky" className={styles.appbar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <img src={logo} width={60} alt="Logo" />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              color: "goldenrod",
              fontSize: "22px",
            }}
          >
            {t("E-DASHBOARD")}
          </Typography>
          <Toolbar>
            {isMobile ? (
              <DrawerComp />
            ) : (
              <Stack direction="row" spacing={2}>
                {!isAuthenticated && (
                  <>
                    <Button className={styles.button}>
                      <NavLink to="/" className={styles.button}>
                        {t("LOGIN")}
                      </NavLink>
                    </Button>
                    <Button className={styles.button}>
                      <NavLink to="/signup" className={styles.button}>
                        {t("SIGNUP")}
                      </NavLink>
                    </Button>
                    <Button>
                      <LanguageSelector />
                    </Button>
                    <Button>
                      <ThemeToggle />
                    </Button>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <Button className={styles.button}>
                      <NavLink to="/home" className={styles.button}>
                        {t("PRODUCT")}
                      </NavLink>
                    </Button>
                    <Button className={styles.button}>
                      <NavLink to="/addToCart" className={styles.button}>
                        {t("CART")}
                      </NavLink>
                    </Button>
                    <Button className={styles.button}>
                      <NavLink to="/address" className={styles.button}>
                        {t("ADDRESS")}
                      </NavLink>
                    </Button>
                    <Button>
                      <LanguageSelector />
                    </Button>
                    <Button>
                      <ThemeToggle />
                    </Button>

                    <Box>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="logout"
                        className={styles.button}
                        onClick={() => setModalOpen(true)}
                      >
                        <LogoutOutlinedIcon sx={{ fontSize: "40px" }} />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Stack>
            )}
          </Toolbar>
        </Toolbar>
        <Box sx={{ borderBottom: "1px solid var(--text-dark)" }}></Box>
      </AppBar>
      <DeleteModal
        open={modalOpen}
        title={t("LOGOUT")}
        cancel={t("CANCEL")}
        msg={t("ARE_YOUR_SURE_WANT_TO_LOGOUT")}
        onClose={() => setModalOpen(false)}
        onClick={handleLogout}
      />
    </>
  );
};

export default Navbar;
