import React from "react";
import { Card } from "../../ui";
import { PrimaryButton, Button } from "../../ui/Buttons";
import { withShadow } from "../../ui/Modifiers";
import styled from "styled-components";
import PropTypes from "prop-types";
import { INSTALLING, INSTALLED, ERROR } from "./InstallStates";

const Title = styled.h2`
  margin-top: 0;
  font-weight: 300;
`;

const CardWithShadow = withShadow(Card);

const InstallButton = ({ installState, onClick }) => {
  switch (installState) {
    case INSTALLING:
      return (
        <PrimaryButton disabled onClick={onClick}>
          Install
        </PrimaryButton>
      );
    case INSTALLED:
      return <p> Installed! </p>;
    case ERROR:
      return <p> Error! </p>;
    default:
      return <PrimaryButton onClick={onClick}>Install</PrimaryButton>;
  }
};

const StoreItem = ({ title, description, onClick, installState }) => (
  <CardWithShadow>
    <Title>{title}</Title>
    {description && <p>{description}</p>}

    <InstallButton installState={installState} onClick={onClick} />
  </CardWithShadow>
);

StoreItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default StoreItem;
