import { gql } from "@apollo/client";

export const LOAD_CONTENT = gql`
  {
    book {
      pages {
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;
