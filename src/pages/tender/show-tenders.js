import React, { Fragment } from "react";
import { GlobHeader } from "../../components/design/glob";
import MUIDataTable from "mui-datatables";
import { MUIDataTableLocaleCZ } from "../../locale/locale-datagrid";
import { withRouter, useRouteMatch } from "react-router-dom";

const ShowTenders = (props) => {
  const tableOptions = {
    ...MUIDataTableLocaleCZ,
  };
  const { path } = useRouteMatch();
  return (
    <Fragment>
      <GlobHeader
        title="Tendery"
        desc="Přehled tenderů"
        createButton
        createButtonLabel="Nový tender"
        onCreateButtonClick={() => props.history.push(`${path}/novy`)}
      />
      <section className="mt-5">
        <MUIDataTable options={tableOptions} />
      </section>
    </Fragment>
  );
};
export default withRouter(ShowTenders);
