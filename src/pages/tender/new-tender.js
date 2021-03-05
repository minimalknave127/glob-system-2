import React, { Fragment, useState } from "react";
import GlobStepper from "./stepper";
import { Button } from "@material-ui/core/";
import { GlobHeader, GlobPaperCard } from "../../components/design/glob";

//steps
import { TenderFirstStep } from "./steps/new-tender-first-step";
import { TenderSecondStep } from "./steps/new-tender-second-step";
import { TenderThirdStep } from "./steps/new-tender-third-step";

const NewTender = () => {
  const steps = ["Zadání dat", "Zadání dodavatelů", "Potvrzení tenderu"];
  const [tenderItems, setTenderItems] = useState([
    {
      code: "113106121",
      name:
        "Rozebrání dlažeb z betonových nebo kamenných dlaždic komunikací pro pěší ručně",
      mj: "m2",
      amount: 126.343,
      price: 64,
      globalPrice: 8085.95,
      subItems: [],
      subItems: {
        name: "hey",
      },
    },
    {
      code: "113106121",
      name:
        "Rozebrání dlažeb z betonových nebo kamenných dlaždic komunikací pro pěší ručně",
      mj: "m2",
      amount: 126.343,
      price: 64,
      globalPrice: 8085.95,
      subItems: [],
      subItems: {
        name: "hou",
      },
    },
  ]);
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
    setTenderItems(data);
  };
  return (
    <Fragment>
      <GlobPaperCard title="Nový tender">
        <GlobStepper className="mb-5" activeStep={activeStep} steps={steps} />
        {activeStep === 0 ? (
          <TenderFirstStep setItems={setTenderItems} items={tenderItems} />
        ) : activeStep === 1 ? (
          <TenderSecondStep setSuppliers={setSuppliers} suppliers={suppliers} />
        ) : (
          <TenderThirdStep items={tenderItems} suppliers={suppliers} />
        )}
        {activeStep !== 0 ? (
          <Button onClick={() => handleStep("back")}>Předchozí</Button>
        ) : null}
        {activeStep !== steps.length - 1 ? (
          <Button onClick={() => handleStep("next")}>Další</Button>
        ) : null}
        {activeStep === steps.length - 1 ? (
          <Button onClick={() => alert("done")}>Dokončit</Button>
        ) : null}
      </GlobPaperCard>
    </Fragment>
  );
};
export default NewTender;
