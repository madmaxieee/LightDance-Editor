import { Paper, Grid } from "@mui/material";

import OFcontrolsContent from "./OFcontrols/OFcontrolsContent";
import IntensityControl from "./IntensityControl";

import useDancer, { PartType } from "../../hooks/useDancer";

import {
  editCurrentStatusFiber,
  editCurrentStatusLED,
} from "../../core/actions";
import { reactiveState } from "../../core/state";
import { useReactiveVar } from "@apollo/client";

import { PartPayloadType } from "core/models";
import { useEffect, useState } from "react";

const PartMode = () => {
  const selected = useReactiveVar(reactiveState.selected);
  const { getPartType } = useDancer();

  const [selectedParts, setSelectedParts] = useState<PartPayloadType>({});
  const [partType, setPartType] = useState<PartType | null>(null);

  const [intensity, setIntensity] = useState<number>(0);
  const [color, setColor] = useState<string>();

  // init states
  useEffect(() => {
    const newSelectedParts: PartPayloadType = {};
    const tempSelectedParts: string[] = [];
    Object.entries(selected).forEach(
      ([dancerName, { selected: dancerSelected, parts }]) => {
        if (parts.length > 0) {
          newSelectedParts[dancerName] = parts;
          parts.forEach((part) => {
            tempSelectedParts.push(part);
          });
        }
      }
    );
    const assertPartType = getPartType(tempSelectedParts[0]);
    if (
      tempSelectedParts.every((part) => getPartType(part) === assertPartType)
    ) {
      setSelectedParts(newSelectedParts);
      setPartType(assertPartType);
    }
  }, [selected]);

  useEffect(
    () => () => {
      Object.entries(selectedParts).forEach(([dancerName, parts]) => {
        parts.forEach((partName) => {
          switch (partType) {
            case "LED":
              editCurrentStatusLED({
                payload: {
                  dancerName,
                  partName,
                  value: { src: "", alpha: intensity },
                },
              });
              break;
            case "FIBER":
              editCurrentStatusFiber({
                payload: {
                  dancerName,
                  partName,
                  value: { color, alpha: intensity },
                },
              });
              break;
          }
        });
      });
    },
    [intensity, color]
  );

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <Paper sx={{ width: "100%", minHeight: "100%", pt: "1.5em" }}>
      {partType === "LED" ? (
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            justifyContent: "space-between",
            px: "5em",
          }}
        >
          <IntensityControl intensity={intensity} setIntensity={setIntensity} />
        </Grid>
      ) : (
        <OFcontrolsContent
          intensity={intensity}
          setIntensity={setIntensity}
          handleColorChange={handleColorChange}
        />
      )}
    </Paper>
  );
};

export default PartMode;