import "./Card.css";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/min/locales";
import axios from "axios";
/* use moment localization*/
      moment.locale("ar");

export default function Card() {
      /* change direction bu language*/

  const { t, i18n } = useTranslation();

  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  const [locale, setLocale] = useState("ar");
        const direction = locale == "ar" ? 'rtl':'ltr'

  /* change date localization use state*/
  const [Date, setDate] = useState("");

    /* change localization by button*/

  function handleClickLanguage() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");

    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");

    }
            setDate(moment().format(" MMMM DD YYYY"))

  }
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);

  useEffect(() => {
            setDate(moment().format(" MMMM DD YYYY"))

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.77&lon=46.74&appid=ddd1ef0bf0273516b242e89c03fbb8ce"
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const minRespons = Math.round(response.data.main.temp_min - 273.15);
        const maxResponse = Math.round(response.data.main.temp_max - 273.15);
        const desc = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        setTemp({
          number: responseTemp,
          min: minRespons,
          max: maxResponse,
          des: desc,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <Container maxWidth="sm">
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/*card*/}
        <div className="card" >
          {/*content*/}
          <div  dir={direction}>
            {/*city &time*/}
            <div

              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  marginRight: "20px",
                  fontWeight: "600",
                }}
              >
                {t("Riyadh")}
              </Typography>

              <Typography variant="h5" style={{ marginRight: "20px" }}>
                {Date}{" "}
              </Typography>
            </div>

            {/*city &time*/}

            <hr></hr>
            {/* CONTAINER OF DEGREE + CLOUD ICON */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                {/* DEGREE & DESCRIPTION */}
                <div>
                  {/* TEMP */}
                  <div

                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.number}
                    </Typography>
                    <img src={temp.icon}></img>
                  </div>
                  {/* TEMP */}
                  <Typography variant="h6">{t(temp.des)}</Typography>

                  {/* MIN & MAX */}
                  <div className="minMax"           dir={direction}
>
                    <h5>{t('Min')} : {temp.min}</h5>
                    <h5 style={{ margin: "0 5px" }}>|</h5>
                    <h5>{t('Max')} : {temp.max}</h5>
                  </div>
                </div>
              </div>
              <CloudIcon style={{ fontSize: "200px" }}></CloudIcon>

              {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
            </div>
            {/* == CONTENT == */}
          </div>
        </div>
        {/* TRANSLATION CONTAINER */}
        <div  dir={direction}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "20px",
          }}
        >
          <Button

            onClick={handleClickLanguage}
            style={{ color: "white" }}
            variant="text"
          >
            {locale == "en" ? "Arabic" : "إنجليزي"}
          </Button>
        </div>
        {/*== TRANSLATION CONTAINER ==*/}
      </div>
    </Container>
  );
}
