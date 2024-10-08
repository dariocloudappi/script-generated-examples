const _ = require("lodash");
const assert = require("assert");

let input = require("../seeds/exampleInitial.json");
let output = require("../seeds/exampleResult.json");

describe("generator-example", () => {
  it("Should add an example to the response component if an example exists in the schema", () => {
    
    const routeKey = "components.responses.notFound.content.application/json.examples";
    const schemaWithExample = { $ref: "#/components/schemas/Error" };

    require("../src/generator/examples")( schemaWithExample, input, `${routeKey}.example-schema-error` );

    assert.deepStrictEqual(_.get(input, routeKey), _.get(output, routeKey));
  });

  it("Should add an example to the response if the response is not a component reference and has a schema but no example", () => {
    
    const routeKey = "paths./users/{userId}.get.responses.200.content.application/json.examples.example-schema-user";
    const schemaWithoutExample = { $ref: "#/components/schemas/User" };

    require("../src/generator/examples")(schemaWithoutExample, input, routeKey);

    assert.deepStrictEqual(_.get(input, routeKey), _.get(output, routeKey));
  });

  it("Should handle non-existent references in the schema correctly.", () => {
    
    const routeKey = "paths./nonexistent.get.responses.404.content.application/json.examples.example-nonexistent";
    const schema = { $ref: "#/components/schemas/Nonexistent" };

    require("../src/generator/examples")(schema, input, routeKey);

    assert.deepStrictEqual(_.get(input, routeKey), _.get(output, routeKey));
  });

  it("Should build the example if the propertys have exampe and schema not examples.", () => {
    
    input = require("../seeds/exampleBuildExampleInitial.json");
    output = require("../seeds/exampleBuildExampleResult.json");

    const routeKey = "paths./libros/{id}.get.responses.200.content.application/json.examples.example-schema-libro";
    const schema = { $ref: "#/components/schemas/Libro" };

    require("../src/generator/examples")(schema, input, routeKey);

    assert.deepStrictEqual( _.get(input, routeKey).$ref, "#/components/examples/example-schema-libro" );
  });
});
