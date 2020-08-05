import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Query } from "../types/graphql";
import { GET_SEARCH_RESULT } from "../api/gqlQueries";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const Searchbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<String>("");
  const { data, error, loading } = useQuery<Query>(GET_SEARCH_RESULT, {
    variables: { searchTerm },
  });

  const CustomToggle = React.forwardRef<HTMLFormElement, ButtonProps>(
    ({ children }, ref) => (
      <Form ref={ref}>
        <Form.Control
          type="input"
          onChange={handleChange}
          placeholder={`Search Heroes ${children}`}
        />
      </Form>
    )
  );

  const handleChange = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {React.useMemo(
        () => (
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>hell</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
        []
      )}
      <p>Error: {JSON.stringify(error)}</p>
      <p>Loading: {JSON.stringify(loading)}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </>
  );
};
type ButtonProps = React.HTMLProps<HTMLFormElement>;

export default Searchbar;
