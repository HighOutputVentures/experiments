import { serve } from "https://deno.land/std@0.127.0/http/server.ts";

console.log("http://localhost:8000/");
serve((_req) => new Response("Hello World\n"), { port: 8000 });
