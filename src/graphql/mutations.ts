import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!, $salary: Float!, $departmentId: ID!) {
    addEmployee(name: $name, position: $position, salary: $salary, departmentId: $departmentId) {
      id
      name
      position
      salary
      department {
        id
        name
      }
    }
  }
`;
