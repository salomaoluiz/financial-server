import Elysia from "elysia";

new Elysia().get("/", () => {
  console.log("Hello World");
}).listen(Bun.env?.PORT);

console.log(`Server was started on port: http://localhost:${Bun.env.PORT}`);
