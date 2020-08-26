import React, { useState } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import { useMutation, ApolloError } from "@apollo/client";
import { Mutation, MutationAddCharacterToUserArgs } from "../types/graphql";
import { ADD_CHAR_TO_USER } from "../api/gqlQueries";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/reducers";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

interface IProps extends ButtonProps {
  characterName: string;
  characterId: number;
}

const AddCharacterButton: React.FC<IProps> = ({
  characterName,
  characterId,
  ...rest
}) => {
  const history = useHistory();
  const isLoggedIn = useSelector<RootState, boolean | null>(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const authToken = useSelector<RootState, string | null>(
    (state: RootState) => state.loginStateReducer.authToken
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const onCompleted = (receivedData: Mutation) => {
    console.log(JSON.stringify(receivedData));
  };
  const onError = (receivedError: ApolloError) => {
    console.log(JSON.stringify(receivedError));
    //TODO: log error to the server
  };
  const [addCharacterToUser, { loading }] = useMutation<
    Mutation,
    MutationAddCharacterToUserArgs
  >(ADD_CHAR_TO_USER, {
    onCompleted,
    onError,
  });
  const handleLogin = () => {
    setShowModal(false);
    history.push("/login");
  };
  const addButtonPressed = () => {
    if (isLoggedIn) {
      addCharacterToUser({
        variables: { charId: characterId },
        context: {
          headers: {
            Authorization: authToken,
          },
        },
      });
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Button {...rest} block onClick={addButtonPressed} disabled={loading}>
        Add {characterName} to your collection
      </Button>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>You aren't logged in :(</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to be logged in to add {characterName} to your collection.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCharacterButton;
