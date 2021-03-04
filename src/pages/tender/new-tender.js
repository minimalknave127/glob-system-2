import React, { Fragment, useState } from "react";
import GlobStepper from "./stepper";
import { Button } from "@material-ui/core/";
import { GlobCard, GlobCardFooter } from "../../components/design/card";

//steps
import { TenderFirstStep } from "./steps/new-tender-first-step";
import { TenderSecondStep } from "./steps/new-tender-second-step";
import { TenderThirdStep } from "./steps/new-tender-third-step";

const NewTender = () => {
  const steps = ["Zadání dat", "Zadání dodavatelů", "Potvrzení tenderu"];
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (action) => {
    switch (action) {
      case "next":
        if (activeStep === steps.length) return;
        setActiveStep(() => activeStep + 1);
        break;
      case "back":
        if (activeStep === 0) return;
        setActiveStep(() => activeStep - 1);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleItemsChange = (data, action) => {
    setItems(data);
  };
  return (
    <Fragment>
      <GlobCard name="Nový tender">
        <GlobStepper className="mb-5" activeStep={activeStep} steps={steps} />
        {activeStep === 0 ? (
          <TenderFirstStep setItems={setItems} items={items} />
        ) : activeStep === 1 ? (
          <TenderSecondStep setSuppliers={setSuppliers} suppliers={suppliers} />
        ) : (
          <TenderThirdStep items={items} suppliers={suppliers} />
        )}
        <GlobCardFooter right>
          {activeStep !== 0 ? (
            <Button onClick={() => handleStep("back")}>Předchozí</Button>
          ) : null}
          {activeStep !== steps.length - 1 ? (
            <Button onClick={() => handleStep("next")}>Další</Button>
          ) : null}
          {activeStep === steps.length - 1 ? (
            <Button onClick={() => alert("done")}>Dokončit</Button>
          ) : null}
        </GlobCardFooter>
      </GlobCard>
    </Fragment>
  );
};
export default NewTender;
