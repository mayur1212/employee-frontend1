import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
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

export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments {
    getAllDepartments {
      id
      name
    }
  }
`;

export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
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
