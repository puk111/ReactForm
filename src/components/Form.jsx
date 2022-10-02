import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/use-input";
import axios from "axios";
import { nipCheck, peselCheck } from "../helpers/validators";

function Form() {
  const [specialData, setSpecialData] = useState({
    type: "osoba",
    file: null,
    fileError: false,
    formFail: false,
  });
  const {
    data: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    dataChangeHandler: nameChangeHandler,
    dataBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    data: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    dataChangeHandler: lastNameChangeHandler,
    dataBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    data: enteredPesel,
    isValid: peselIsValid,
    hasError: peselHasError,
    dataChangeHandler: peselChangeHandler,
    dataBlurHandler: peselBlurHandler,
    reset: resetPeselInput,
  } = useInput((value) => peselCheck(value));

  const {
    data: enteredNip,
    isValid: nipIsValid,
    hasError: nipHasError,
    dataChangeHandler: nipChangeHandler,
    dataBlurHandler: nipBlurHandler,
    reset: resetNipInput,
  } = useInput((value) => nipCheck(value));

  const fileIsValid = specialData.file;

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredLastNameIsValid &&
    ((specialData.type === "osoba" && peselIsValid) ||
      (specialData.type === "firma" && nipIsValid)) &&
    fileIsValid
  ) {
    formIsValid = true;
  }

  const radioChangeHendler = (e) => {
    setSpecialData({ ...specialData, [e.target.name]: e.target.value });
  };

  const handleChangeImg = (e) => {
    const img = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg"];
    if (img && allowedTypes.includes(img.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setSpecialData({
          ...specialData,
          [e.target.name]: reader.result,
          fileError: false,
        });
      };
      reader.readAsDataURL(img);
    } else {
      setSpecialData({ ...specialData, fileError: true, file: null });
    }
  };

  const resetFile = (e) => {
    setSpecialData({ ...specialData, file: null });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:60001/Contractor/Save", {
        enteredName,
        enteredLastName,
        enteredPesel,
        enteredNip,
        type: specialData.type,
        file: specialData.file,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setSpecialData({ ...specialData, formFail: true, file: null });
      });
    resetNameInput();
    resetLastNameInput();
    resetPeselInput();
    resetNipInput();
    resetFile();
  };
  return (
    <FormConteiner onSubmit={submitHandler}>
      <Title>Dodaj kontrahenta</Title>
      {/* First Name */}
      <InputContainer>
        <Label htmlFor="firstname">Imie</Label>
        <InputText
          type="text"
          id="firstname"
          name="FirstName"
          placeholder="Imie"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p>Podaj imie</p>}
      </InputContainer>
      {/* Last Name */}
      <InputContainer>
        <Label htmlFor="lastname">Nazwisko</Label>
        <InputText
          type="text"
          id="lastname"
          name="LastName"
          placeholder="Nazwisko"
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          value={enteredLastName}
        />
        {lastNameInputHasError && <p>Podaj nazwisko</p>}
      </InputContainer>

      {/* RADIOOOOOO */}

      <WrapperInput>
        <InputContainer className="radio">
          <label htmlFor="osoba">Osoba</label>
          <input
            id="osoba"
            type="radio"
            value="osoba"
            name="type"
            onChange={radioChangeHendler}
            checked={specialData.type === "osoba"}
          />
        </InputContainer>
        <InputContainer className="radio">
          <label htmlFor="firma">Firma</label>
          <input
            id="firma"
            type="radio"
            value="firma"
            name="type"
            onChange={radioChangeHendler}
            checked={specialData.type === "firma"}
          />
        </InputContainer>
      </WrapperInput>

      {specialData.type === "osoba" ? (
        <InputContainer>
          {/* Pesel */}
          <Label htmlFor="pesel">Pesel</Label>
          <InputText
            type="number"
            id="pesel"
            name="pesel"
            placeholder="Pesel"
            onChange={peselChangeHandler}
            onBlur={peselBlurHandler}
            value={enteredPesel}
          />
          {peselHasError && <p>Podaj pesel</p>}
        </InputContainer>
      ) : (
        <InputContainer>
          {/* Nip */}
          <Label htmlFor="nip">Nip</Label>
          <InputText
            type="number"
            id="nip"
            name="nip"
            placeholder="Nip"
            onChange={nipChangeHandler}
            onBlur={nipBlurHandler}
            value={enteredNip}
          />
          {nipHasError && <p>Podaj nip</p>}
        </InputContainer>
      )}
      <ImgWrapper>
        <FileInputContainer>
          <FileInput
            type="file"
            id="file"
            name="file"
            onChange={handleChangeImg}
          />
          <label htmlFor="file">Select file</label>
          {specialData.fileError && <p>podaj odpowiedni plik</p>}
        </FileInputContainer>

        <ImgContainer>
          {specialData.file === null ? (
            <></>
          ) : (
            <img alt="" src={specialData.file} />
          )}
        </ImgContainer>
      </ImgWrapper>
      <Button disabled={!formIsValid} valid={formIsValid}>
        Wyślij
      </Button>
      {specialData.formFail && <p>Nie znaleziono metody zapisu</p>}
    </FormConteiner>
  );
}

export default Form;

const FormConteiner = styled.form`
  width: 500px;
  height: 900px;
  background-color: #11354190;
  color: #fff;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin: 20px 0;
`;

const WrapperInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .radio {
    width: 20%;
    margin: 15px 20px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 15px 0;
  &.radio {
    flex-direction: row;
    label {
      order: 2;
    }
    input {
      order: 1;
    }
  }
  p {
    margin-left: 50px;
    color: red;
    font-size: 16px;
    font-weight: 300;
  }
`;
const InputText = styled.input`
  padding: 10px 20px;
  border-radius: 20px;
  outline: none;
  border: none;
  width: 80%;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-left: 50px;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;
`;

const ImgContainer = styled.div`
  width: 150px;
  height: 150px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  & img {
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
  }
`;
const FileInputContainer = styled.div`
  label {
    display: flex;
    position: relative;
    width: 140px;
    height: 50px;
    border-radius: 25px;
    background-color: #fff;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    cursor: pointer;
    transition: transform 0.2s ease-out;
  }
  p {
    color: red;
    font-size: 16px;
    font-weight: 300;
    margin-top: 15px;
  }
`;
const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  &:hover + label {
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  display: block;
  margin: 80px auto;
  border-radius: 25px;
  padding: 20px 80px;
  font-size: 20px;
  font-weight: bold;
  border-color: ${(props) => (props.valid ? "black" : "red")};
  cursor: ${(props) => (props.valid ? "pointer" : "not-allowed")};
`;
