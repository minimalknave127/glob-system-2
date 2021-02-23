import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "transparent",
    margin: 0,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default function GlobStepper(props) {
  const classes = useStyles();
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = props.steps;

  return (
    <div className={classes.root + " " + props.className}>
      <Stepper style={{margin: 0, padding: 0, backgroundColor: "transparent"}} activeStep={props.activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* <div>
        {props.activeStep === props.steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={props.handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(props.activeStep)}</Typography>
            <div>
              <Button disabled={props.activeStep === 0} onClick={props.handleBack} className={classes.button}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={props.handleNext}
                className={classes.button}
              >
                {props.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
GlobStepper.propTypes = {
    steps: PropTypes.array,
    activeStep: PropTypes.number,
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    handleReset: PropTypes.func,
    className: PropTypes.string
}
