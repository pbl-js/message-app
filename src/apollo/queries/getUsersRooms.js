import { gql } from "@apollo/client";

export const GET_USERS_ROOMS = gql`
  query GetUserRooms {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;
