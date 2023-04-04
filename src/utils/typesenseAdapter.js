import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

let TYPESENSE_SERVER_CONFIG = {
  apiKey: "xyz",
  nodes: [
    {
      host: "receptiontypesense.cocobod.net",
      port: "443",
      protocol: "https",
    },
  ],
  connectionTimeoutSeconds: 1,
  numRetries: 8,
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    query_by: "employee,Department,DDivisions,roomno,email",
    query_by_weights: "7,5,3,2,1",
    num_typos: 3,
    typo_tokens_threshold: 1,
  },
});

export const searchClient = typesenseAdapter.searchClient;
console.log(searchClient);
