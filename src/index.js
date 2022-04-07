import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Typography,
  Box,
  Grid,
  Toolbar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import "./style.css";
import { common_java, full_data } from "./data_full";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

const STORAGE_KEY = "previous_phonetic_input";

const BtnInput = ({ character, onClick }) => (
  <Chip
    onClick={onClick}
    sx={{
      m: 1,
      pt: 0.8,
      pb: 0.8,
      pl: 0.6,
      pr: 0.6,
      fontSize: "1.3rem",
    }}
    label={
      <TextToPhonetic
        style={{
          fontSize: "1.3rem",
        }}
      >
        {character == " " ? "space" : character}
      </TextToPhonetic>
    }
  />
);

const PreviousData = ({ addValue }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      var a = localStorage.getItem(STORAGE_KEY);
      if (a) {
        a = JSON.parse(a);
        setData(a);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {data.map((item, idx) => (
        <BtnInput
          key={idx}
          character={item}
          onClick={async () => {
            remember(item);
            addValue(item);
          }}
        />
      ))}
    </>
  );
};

function remember(text) {
  try {
    var before = localStorage.getItem(STORAGE_KEY);

    if (before) {
      before = JSON.parse(before);

      if (!before.includes(text)) {
        before.unshift(text);
      }

      if (before.length > 20) {
        before.pop();
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(before));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([text]));
    }
  } catch (error) {
    console.log(error);
  }
}

export function TextToPhonetic({ children, ...rest }) {
  return (
    <span className="fonetis" {...rest}>
      {children}
    </span>
  );
}

export function InputPhonetic({
  addValue,
  useRemember = true,
  dataDefault = common_java,
  height = "300px",
  sx = {},
  ...rest
}) {
  const sxDefault = {
    maxWidth: "500px",
  };

  const [data, setData] = useState(dataDefault);
  const [more, setMore] = useState(false);

  //https://ipa.typeit.org/full/

  return (
    <Box sx={{ ...sx, ...sxDefault }} {...rest}>
      <Toolbar sx={{ padding: "0px!important", overflow: "auto" }}>
        <Button
          onClick={() => {
            if (more) {
              setData(dataDefault);
              setMore(false);
            } else {
              setData(full_data);
              setMore(true);
            }
          }}
          size="small"
          color="inherit"
          startIcon={more ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {more ? "Less" : "More"}
        </Button>
        {useRemember && <PreviousData addValue={addValue} />}
      </Toolbar>

      <Card
        sx={{
          overflowY: "scroll",
          height: height,
        }}
      >
        <CardContent>
          {more && (
            <Typography variant="body1" gutterBottom>
              You can scroll down
            </Typography>
          )}

          {data.map((item, idx) => {
            if (typeof item == "string") {
              return (
                <BtnInput
                  key={idx}
                  character={item}
                  onClick={async () => {
                    if (useRemember) {
                      remember(item);
                    }
                    addValue(item);
                  }}
                />
              );
            } else {
              return (
                <div key={idx}>
                  <Typography variant="body1" gutterBottom>
                    {item.label}
                  </Typography>
                  {item.data.split("").map((itemChild, index) => (
                    <BtnInput
                      key={index}
                      character={itemChild}
                      onClick={async () => {
                        if (useRemember) {
                          remember(itemChild);
                        }
                        addValue(itemChild);
                      }}
                    />
                  ))}
                </div>
              );
            }
          })}
        </CardContent>
      </Card>
    </Box>
  );
}

export default { TextToPhonetic, InputPhonetic };
