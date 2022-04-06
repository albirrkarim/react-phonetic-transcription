import React, { useState } from "react";
import { Button, Chip, Typography, Box, Grid } from "@mui/material";
import "./style.css";
import { common_java, full_data } from "./data_full";

export function TextToPhonetic({ children, ...rest }) {
  return (
    <span className="fonetis" {...rest}>
      {children}
    </span>
  );
}

export function InputPhonetic({
  addValue,
  dataDefault = common_java,
  height = "300px",
  ...rest
}) {
  const BtnInput = ({ character }) => (
    <Chip
      onClick={() => {
        addValue(character);
      }}
      sx={{
        m: 1,
        pt: 0.8,
        pb: 0.8,
        pl: 0.6,
        pr: 0.6,
        fontSize: "1.3rem",
      }}
      className="fonetis"
      label={character}
    />
  );

  const [data, setData] = useState(dataDefault);
  const [more, setMore] = useState(false);

  //https://ipa.typeit.org/full/

  return (
    <Box {...rest}>
      <Grid container justifyContent={"flex-end"}>
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
        >
          {more ? "Less" : "More"}
        </Button>
      </Grid>

      <Box
        sx={{
          overflowY: "scroll",
          height: height,
        }}
      >
        {more && (
          <Typography variant="body1" gutterBottom>
            You can scroll down
          </Typography>
        )}
        {data.map((item, idx) => {
          if (typeof item == "string") {
            return <BtnInput key={idx} character={item} />;
          } else {
            return (
              <div key={idx}>
                <Typography variant="body1" gutterBottom>
                  {item.label}
                </Typography>
                {item.data.split("").map((itemChild, index) => (
                  <BtnInput key={index} character={itemChild} />
                ))}
              </div>
            );
          }
        })}
      </Box>
    </Box>
  );
}

export default { TextToPhonetic, InputPhonetic };
