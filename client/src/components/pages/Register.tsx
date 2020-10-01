import React from "react";
import styled from "styled-components";
import { Button, Container, CssBaseline, TextField, Typography, Chip } from "@material-ui/core";
import { attributeManager } from "../../attributeManager";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { register } from "../../api";

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

const SkillBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  > * {
    margin: 4px;
  }
`;

enum RegisterState {
  BasicInfo, Experience, Skills
}

type Position = {
  company: string;
  position: string;
}

export const Register = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [displayName, setDisplayName] = React.useState<string>("");
  const [age, setAge] = React.useState<number>(-1);
  const [region, setRegion] = React.useState<string>("");
  const [education, setEducation] = React.useState<string>("");
  const [industry, setIndustry] = React.useState<string>("");
  const [currentPosition, setCurrentPosition] = React.useState<Position>({ company: "", position: ""});
  const [pastPositions, setPastPositions] = React.useState<Position[]>([]);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
  const [selectedProgrammingLanguages, setSelectedProgrammingLanguages] = React.useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<string[]>([]);

  const [view, setView] = React.useState<RegisterState>(RegisterState.BasicInfo);

  const renderBasicInformation = () => {
    if (view !== RegisterState.BasicInfo) {
      return;
    }
    return (
      <>
        <Typography variant="h4">Basic Information</Typography>
        <TextField fullWidth variant="outlined" label="Username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} error={username.length <= 0}/>
        <TextField fullWidth variant="outlined" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={password.length <= 0}/>
        <TextField fullWidth variant="outlined" label="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} error={displayName.length <= 0}/>
        <TextField fullWidth variant="outlined" label="Age" type="number" value={age < 0 ? "" : age} onChange={(e) => setAge(Number(e.target.value))} error={age < 0}/>
        <TextField fullWidth variant="outlined" label="Region" value={region} onChange={(e) => setRegion(e.target.value)} error={region.length <= 0}/>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setView(RegisterState.Experience)}
          disabled={username.length <= 0 || password.length <= 0 || displayName.length <= 0 || age < 0 || region.length <= 0}
        >
          Next
        </Button>
      </>
    );
  }

  const updatePastPosition = (index: number, position: Position) => {
    const updatedPastPositions = pastPositions;
    updatedPastPositions[index] = position;
    setPastPositions([...updatedPastPositions]);
  };

  const renderEmploymentInformation = () => {
    if (view !== RegisterState.Experience) {
      return;
    }
    return (
      <>
        <Typography variant="h4">Experience</Typography>
        <TextField fullWidth variant="outlined" label="Education" value={education} onChange={(e) => setEducation(e.target.value)} error={education.length <= 0}/>
        <TextField fullWidth variant="outlined" label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} error={industry.length <= 0}/>
        <DoubleInput>
          <TextField fullWidth variant="outlined" label="Current Company" onChange={e => setCurrentPosition({ company: e.target.value, position: currentPosition.position })}/>
          <TextField fullWidth variant="outlined" label="Position" onChange={e => setCurrentPosition({ company: currentPosition.company, position: e.target.value })}/>
        </DoubleInput>
        <Typography component="p">Past Employment</Typography>
        {pastPositions.map((employment, index) => {
          return (
            <DoubleInput key={index /* yikes */}>
              <TextField
                fullWidth
                variant="outlined"
                label="Company"
                value={employment.company}
                onChange={e => updatePastPosition(index, { position: employment.position, company: e.target.value})}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Position"
                value={employment.position}
                onChange={e => updatePastPosition(index, { position: e.target.value, company: employment.company})}
              />
            </DoubleInput>
          );
        })}
        <Button fullWidth variant="contained" color="secondary" onClick={() => setPastPositions([...pastPositions, { company: "", position: ""}])}>Add a past position</Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setView(RegisterState.Skills)}
          disabled={
            education.length <= 0 ||
            industry.length <= 0 ||
            currentPosition.company.length <= 0 ||
            currentPosition.position.length <= 0 ||
            (pastPositions.length > 0 && pastPositions.filter(employment => employment.position.length <= 0 || employment.company.length <= 0).length > 0)
          }
        >
          Next
        </Button>
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
          onChange={(_event, skill: string | null) => {
            if (skill && !selectedSkills.includes(skill)) {
              setSelectedSkills([...selectedSkills, skill]);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Skills" variant="outlined" />}
        />
        <SkillBox>
          {selectedSkills.map((skill, index) => {
            return (
              <Chip
                key={index /* yikes */}
                label={skill}
                onDelete={() => setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill))}
                color="primary"
              />
            )
          })}
        </SkillBox>
        <Autocomplete
          fullWidth
          options={availableProgrammingLanguages}
          onChange={(_event, programmingLanguage: string | null) => {
            if (programmingLanguage && !selectedProgrammingLanguages.includes(programmingLanguage)) {
              setSelectedProgrammingLanguages([...selectedProgrammingLanguages, programmingLanguage]);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Programming Languages" variant="outlined" />}
        />
        <SkillBox>
          {selectedProgrammingLanguages.map((programmingLanguage, index) => {
            return (
              <Chip
                key={index /* yikes */}
                label={programmingLanguage}
                onDelete={() => setSelectedProgrammingLanguages(selectedProgrammingLanguages.filter(selectedProgrammingLanguage => selectedProgrammingLanguage !== programmingLanguage))}
                color="primary"
              />
            )
          })}
        </SkillBox>
        <Autocomplete
          fullWidth
          options={availableFrameworks}
          onChange={(_event, framework: string | null) => {
            if (framework && !selectedFrameworks.includes(framework)) {
              setSelectedFrameworks([...selectedFrameworks, framework]);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Frameworks" variant="outlined" />}
        />
        <SkillBox>
          {selectedFrameworks.map((framework, index) => {
            return (
              <Chip
                key={index /* yikes */}
                label={framework}
                onDelete={() => setSelectedFrameworks(selectedFrameworks.filter(selectedFramework => selectedFramework !== framework))}
                color="primary"
              />
            )
          })}
        </SkillBox>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => attemptRegistration()}
        >
          Complete Registration
        </Button>
      </>
    );
  }

  const attemptRegistration = async () => {
    const result = await register({
      username,
      password,
      name: displayName,
      age,
      region,
      education,
      industry,
      currentEmployment: currentPosition,
      pastEmployment: pastPositions,
      skills: selectedSkills,
      programmingLanguages: selectedProgrammingLanguages,
      frameworks: selectedFrameworks
    });
    console.log(result);
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