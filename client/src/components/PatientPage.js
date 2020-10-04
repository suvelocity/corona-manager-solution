
import React, { useEffect, useState } from "react";
import { read, create } from "../services/network";
import "./PatientPage.css";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { Input } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import gif from '../media/corona_gif.gif';



function PatientPage() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState(0);
    const [cities, setCities] = useState(null);
    const [hospitals, setHospitals] = useState(null);
  
    useEffect(() => {
      getInfo();
      getCities();
      getHospital();
    }, []);
  
    const getCities = async () => {
      await read(`cities`).then((r) => {
        setCities(r);
      });
    };
  
    const getHospital = async () => {
      await read(`hospitals`).then((r) => {
        setHospitals(r);
      });
    };
  
    const {
      register: addPatient,
      errors: patientError,
      handleSubmit: submitPatient,
    } = useForm({
      mode: "onBlur",
    });
  
    const onAddPatient = (data) => {
      console.log(data);
      setOpen(false);
      create("patients", data).then((result) => {
        console.log(result);
      });
    };
  
    const getInfo = async () => {
      await read(`patients`).then((r) => {
        setData(r);
      });
    };

    return (
        <>
        { Array.isArray(data) ?
    <div id='patient'>
        <h2>Select a Patient:</h2>
        <select onChange={async (e) => {
            await read(`patients/byId/${e.target.value}`).then(r => {setDisplay(r)});
            }}>
            {data && data.map((e) => <option value={e.id}>{e.name}</option>)}
        </select>
        {display !== 0 && <div>
            <div className='field'>Patient Name: <span>{display.name}</span></div>
            <div className='field'>Date of birth: <span>{display.dateOfBirth}</span></div>
            <div className='field'>City: <span>{display.City.name}</span></div>
            {display.CovidTests[0] && <div className='field'>Covid Test Result: <span>{display.CovidTests[0].isSick ? 'sick' : 'healthy'}</span></div>}
            <div className='field'>Symptoms:</div>
            <ul>
            {display.SymptomsByPatients.map((e) => <li>{e.Symptom.name}</li>)}
            </ul>
            </div>}
            <IconButton onClick={() => setOpen(true)}>
        <AddCircleIcon />
        <Typography variant="h6">add patient</Typography>
      </IconButton>

      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <form
            // className={classes.root}
            onSubmit={submitPatient(onAddPatient)}
            noValidate
            autoComplete="off"
          >
            <DialogTitle id="form-dialog-title">Add Patient</DialogTitle>
            <DialogContent>
              <TextField
                inputRef={addPatient}
                autoFocus
                margin="dense"
                id="name"
                label="Patient Name"
                name="name"
                type="text"
                fullWidth
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                inputRef={addPatient}
                autoFocus
                margin="dense"
                id="date Of Birth"
                label="date Of Birth"
                name="dateOfBirth"
                type="date"
                fullWidth
              />
              {cities && (
                <Grid item>
                  <InputLabel htmlFor="selectCity">city</InputLabel>
                  <Select
                    native
                    id="selectCity"
                    placeholder="city"
                    inputRef={addPatient({ required: true })}
                    name="cityId"
                  >
                    <option aria-label="None"></option>
                    {cities.map((city, index) => {
                      return (
                        <option key={index} value={city.id}>
                          {city.name}
                        </option>
                      );
                    })}
                  </Select>
                </Grid>
              )}
              <Grid item>
                <InputLabel htmlFor="status">status</InputLabel>
                <Select
                  native
                  id="selectStatus"
                  placeholder="status"
                  inputRef={addPatient({ required: true })}
                  name="status"
                >
                  <option aria-label="None"></option>
                  <option value="sick">sick</option>
                  <option value="respiratory">respiratory</option>
                  <option value="recovered">recovered</option>
                  <option value="dead">dead</option>
                  <option value="isolation">isolation</option>
                </Select>
              </Grid>
              {hospitals && (
                <Grid item>
                  <InputLabel htmlFor="selectHospital">hospital</InputLabel>
                  <Select
                    native
                    id="selectHospital"
                    placeholder="hospital"
                    inputRef={addPatient({ required: true })}
                    name="hospitalId"
                  >
                    <option aria-label="None"></option>
                    {hospitals.map((hospital, index) => {
                      return (
                        <option key={index} value={hospital.id}>
                          {hospital.name}
                        </option>
                      );
                    })}
                  </Select>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </div>

    :
    <div>
        <img src={gif} alt="loading..." />
        <h1>server not connected</h1>
    </div>
}
    </>
    );
}

export default PatientPage;