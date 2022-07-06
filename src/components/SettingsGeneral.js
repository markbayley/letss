import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import { useAuth } from "./../util/auth";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

function SettingsGeneral(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    return auth
      .updateProfile(data)
      .then(() => {
        // Set success status
        props.onStatus({
          type: "success",
          message: "Your profile has been updated",
        });
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit(data),
          });
        } else {
          // Set error status
          props.onStatus({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
            defaultValue={auth.user.name}
            error={errors.name ? true : false}
            helperText={errors.name && errors.name.message}
            fullWidth={true}
            inputRef={register({
              required: "Please enter your name",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            name="email"
            placeholder="user@example.com"
            defaultValue={auth.user.email}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
            fullWidth={true}
            inputRef={register({
              required: "Please enter your email",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="phone"
            label="Phone"
            name="phone"
            placeholder="+61 1234 5678"
            defaultValue={auth.user.phone}
            error={errors.phone ? true : false}
            helperText={errors.phone && errors.phone.message}
            fullWidth={true}
            inputRef={register({
              required: "Please enter your phone number",
            })}
          />
        </Grid>




        <Grid item={true} xs={12} md={props.showNameField ? 6 : 12}>
        <FormHelperText sx={{fontFamily: "Boogaloo", ml: "13px"}}>Preferred Class</FormHelperText>
          <FormControl >
            <RadioGroup
              sx={{ml:"5px"}}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormLabel sx={{fontFamily:"Boogaloo", mt:"7px", mx:"3px", color:"black"}}>Sunday 9pm</FormLabel><FormControlLabel value="Sunday 9pm" control={<Radio  name="class1" defaultValue={auth.user.class1} inputRef={register({

              })} />} />
              <FormLabel sx={{fontFamily:"Boogaloo", mt:"7px", mr:"3px", color:"black"}}>Monday 1pm</FormLabel><FormControlLabel value="Monday 1pm" control={<Radio name="class2" defaultValue={auth.user.class2} inputRef={register({

              })} />} />
               <FormLabel sx={{fontFamily:"Boogaloo", mt:"7px", mr:"3px", color:"black"}}>Saturday 8pm</FormLabel><FormControlLabel value="Saturday 8pm" control={<Radio name="class3" defaultValue={auth.user.class3} inputRef={register({

              })} />} />

            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={pending}
            fullWidth={true}
          >
            {!pending && <span>Save</span>}

            {pending && <CircularProgress size={28} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SettingsGeneral;
