"use-client";

import { Fragment } from "react";
import styles from "./stepper.module.css";

type StepperProps = {
  step: number;
  setStep: (step: number) => void;
  setFilmSelectedDetails: (film: any) => void;
  steps: number[];
  stepsNames: string[];
};

export default function Stepper({
  step,
  setStep,
  setFilmSelectedDetails,
  steps,
  stepsNames,
}: StepperProps) {
  const handleBacktoStep = (step: number, s: number) => {
    if (step > s) {
      setStep(s);
      if (s === 1) {
        setFilmSelectedDetails({});
      }
    }
  };
  return (
    <div>
      <div className={styles.stepper}>
        {steps.map((s, index) => (
          <Fragment key={s + index}>
            <div
              className={`${styles.step} ${step === s ? styles.active : ""}`}
              onClick={() => handleBacktoStep(step, s)}
            >
              {s}
            </div>
            <div className={styles.line}>
              {" "}
              <span className={styles.name}>{stepsNames[index]}</span>
            </div>
          </Fragment>
        ))}
        <div className={styles.step}>V</div>
      </div>
    </div>
  );
}
