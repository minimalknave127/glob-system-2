import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Search from "@material-ui/icons/Search";
import React from "react";
import { withRouter } from "react-router-dom";
import { GlobCard } from "../../../components/design/card";
const Finder = () => {
  return (
    <React.Fragment>
      <GlobCard name="Vyhledávač objednávky">
        <FormControl style={{ width: "100%" }}>
          <InputLabel htmlFor="standard-adornment-password">
            Zadejte číslo objednávky
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type="search"
            //value={values.password}
            //onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  //onClick={handleClickShowPassword}
                  //onMouseDown={handleMouseDownPassword}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </GlobCard>
    </React.Fragment>
  );
};
export default withRouter(Finder);
