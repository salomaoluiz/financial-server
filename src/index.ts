import { app } from "@entrypoint";

app.listen(Bun.env?.PORT);

console.log(`Server was started on port: http://localhost:${Bun.env.PORT}`);
