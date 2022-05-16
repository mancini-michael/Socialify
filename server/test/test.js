const expect = require("chai").expect;
const fetch = require("node-fetch");

describe("POST /api/v1/post", () => {
  it("send bad POST request to http://localhost:8080/api/v1/post", async () => {
    await fetch("http://localhost:8080/api/v1/post", {
      method: "POST",
      body: JSON.stringify({
        author: "not-valid-Id",
        description: "error example",
        picture: "error picture",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        expect(result.status).to.equal(404);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });

  it("send POST request to http://localhost:8080/api/v1/post", async () => {
    await fetch("http://localhost:8080/api/v1/post", {
      method: "POST",
      body: JSON.stringify({
        author: "62824d0a048c24cb61b39049",
        description: "example",
        picture: "picture",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        expect(result.status).to.equal(200);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
});

describe("GET /api/v1/post", () => {
  it("send GET request to http://localhost:8080/api/v1/post", async () => {
    await fetch("http://localhost:8080/api/v1/post")
      .then((result) => {
        expect(result.status).to.equal(200);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
});
