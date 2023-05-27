import { type ReactNode } from "react";
import styles from "./styles.module.css";
import { Box } from "@mui/material";

type LoadingProps = {
  children?: ReactNode;
};

function Loading({ children }: LoadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      <div
        className={`${styles["ball-grid-beat"]} ${styles["ball-grid-pulse"]}`}
      >
        {[...Array(9).keys()].map((i) => (
          <div key={i} />
        ))}
      </div>
      {children}
    </Box>
  );
}

export default Loading;
