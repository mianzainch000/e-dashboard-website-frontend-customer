import config from "../../api/config";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProducts } from "../../api/endPoint";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "../../components/Snackbar";
import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";

const Home = () => {
  const { t } = useTranslation();
  const snackBarMessage = useSnackbar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await getProducts();
      console.log("res", res);
      if (res.status === 201) {
        setData(res?.data);
      }
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          minHeight: "80vh",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : data.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {data.map((product) => (
              <Card
                key={product._id}
                sx={{
                  m: 2,
                  display: "flex",
                  width: "300px",
                  flexDirection: "column",
                  color: "var(--text-dark)",
                  border: "1px solid white",
                  transition: "transform 0.3s ease",
                  backgroundColor: "var(--text-light)",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component={"img"}
                  src={`${config.baseURL}uploads/${product.image[0]}`}
                  alt={product.name}
                  sx={{ height: 300 }}
                />
                <CardContent>
                  <Typography variant="h4" textAlign="center">
                    {product.price} Rs
                  </Typography>

                  <Box
                    display="flex"
                    marginTop="20px"
                    justifyContent="center"
                    flexDirection={"column"}
                  >
                    <NavLink
                      to={{
                        pathname: `/detail/${product._id}`,
                      }}
                    >
                      <Button
                        color="secondary"
                        variant="contained"
                        sx={{ width: "100%", textTransform: "none" }}
                      >
                        {t("VIEW_DETAIL")}
                      </Button>
                    </NavLink>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="h5" color="error">
            {t("NO_PRODUCT_FOUND")}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Home;
