import React from "react";
import styled from "styled-components";
import { Button, Container, CssBaseline, TextField, Typography } from "@material-ui/core";
import { attributeManager } from "../../attributeManager";
import Autocomplete from '@material-ui/lab/Autocomplete';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  > * {
    margin: 8px;
  }
`;

const DoubleInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  > * {
    width: 48%;
  }
`;

enum RegisterState {
  BasicInfo, Experience, Skills
}

export const Register = () => {
  const [numPastPositions, setNumPastPositions] = React.useState<number>(1);
  const [view, setView] = React.useState<RegisterState>(RegisterState.BasicInfo);

  const renderBasicInformation = () => {
    if (view !== RegisterState.BasicInfo) {
      return;
    }
    return (
      <>
        <Typography variant="h4">Basic Information</Typography>
        <TextField fullWidth variant="outlined" label="Username" name="username" autoFocus />
        <TextField fullWidth variant="outlined" label="Password" name="password" type="password" />
        <TextField fullWidth variant="outlined" label="Display Name" name="name" />
        <TextField fullWidth variant="outlined" label="Age" name="age" type="number" />
        <TextField fullWidth variant="outlined" label="Region" name="region" />
        <Button fullWidth variant="contained" color="primary" onClick={() => setView(RegisterState.Experience)}>Next</Button>
      </>
    );
  }

  const renderEmploymentInformation = () => {
    if (view !== RegisterState.Experience) {
      return;
    }
    return (
      <>
        <Typography variant="h4">Experience</Typography>
        <DoubleInput>
          <TextField fullWidth variant="outlined" label="Current Company" name="region" />
          <TextField fullWidth variant="outlined" label="Position" name="region" />
        </DoubleInput>
        <Typography component="p">Past Employment</Typography>
        {Array(numPastPositions).fill(
          <DoubleInput>
            <TextField fullWidth variant="outlined" label="Company" name="region" />
            <TextField fullWidth variant="outlined" label="Position" name="region" />
          </DoubleInput>
        )}
        <Button fullWidth variant="contained" color="secondary" onClick={() => setNumPastPositions(numPastPositions + 1)}>Add a past position</Button>
        <Button fullWidth variant="contained" color="primary" onClick={() => setView(RegisterState.Skills)}>Next</Button>
      </>
    );
  }

  const renderSkillInformation = () => {
    if (view !== RegisterState.Skills) {
      return;
    }

    const availableSkills = attributeManager.getSkills();
    const availableProgrammingLanguages = attributeManager.getProgrammingLanguages();
    const availableFrameworks = attributeManager.getFrameworks();
    
    return (
      <>
        <Typography variant="h4">Skills</Typography>
        <Autocomplete
          fullWidth
          options={availableSkills}
          renderInput={(params) => <TextField {...params} label="Skills" variant="outlined" />}
        />
        <Autocomplete
          fullWidth
          options={availableProgrammingLanguages}
          renderInput={(params) => <TextField {...params} label="Programming Languages" variant="outlined" />}
        />
        <Autocomplete
          fullWidth
          options={availableFrameworks}
          renderInput={(params) => <TextField {...params} label="Frameworks" variant="outlined" />}
        />
      </>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <RegisterContainer>
        <Typography variant="h2">Register</Typography>
        {renderBasicInformation()}
        {renderEmploymentInformation()}
        {renderSkillInformation()}
      </RegisterContainer>
    </Container>
  );
}