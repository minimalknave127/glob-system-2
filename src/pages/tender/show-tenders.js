import React, { Fragment } from "react";
import { GlobHeader } from "../../components/design/glob";
import MUIDataTable from "mui-datatables";
import { MUIDataTableLocaleCZ } from "../../locale/locale-datagrid";

const ShowTenders = () => {
  const tableOptions = {
    ...MUIDataTableLocaleCZ,
  };
  return (
    <Fragment>
      <GlobHeader title="Tendery" desc="Přehled tenderů" />
      <section className="mt-5">
        <MUIDataTable options={tableOptions} />
      </section>
    </Fragment>
  );
};
export default ShowTenders;
