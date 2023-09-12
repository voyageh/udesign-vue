import * as OpenAPI from "openapi-tscode";

const generate = async (input, output) => {
  await OpenAPI.generate({
    input,
    output,
    httpClient: OpenAPI.HttpClient.FETCH,
    useOptions: true,
    useUnionTypes: false,
    exportCore: true,
    exportSchemas: true,
    exportModels: true,
    exportServices: true,
  });
};

generate("http://192.168.210.134:26002/swagger/v1/swagger.json", "./play/api");
