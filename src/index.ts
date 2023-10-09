import { app } from "@entrypoint";
import { swagger } from "@elysiajs/swagger";

app.use(swagger()).listen(Bun.env?.PORT);

console.log(`Server was started on port: http://localhost:${Bun.env.PORT}/swagger`);
