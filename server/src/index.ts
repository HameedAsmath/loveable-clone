import express from 'express';
import {b} from "../baml_client/async_client.js";
import cors from "cors";
import "dotenv/config"

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// app.get("/",(req, res) => {
//     res.send(b.Greet("Hameed Asmath"));
// })

// async function main() {
//     const stream = b.stream.EditCode([], "Create todo application", [], "{}")
//     for await (const partial of stream) {
//         if(partial.plan) {
//             console.log("Plan:", partial.plan.value);
//             console.log("State", partial.plan.state);
//         }
//         if(partial.files) {
//             for(const file of partial.files) {
//                 console.log("File:", file.path);
//                 console.log("File Content:",file.content);
//             }
//         }
//     }
// }

// main()


app.post("/edit-code", async (req, res) => {
    const {history, feedback, code_files, package_json} = req.body;
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    const stream = b.stream.EditCode(history, feedback, code_files, package_json)
    for await (const partial of stream) {
        if(partial.plan) {
            res.write(`data: ${JSON.stringify({plan: partial.plan.value, state: partial.plan.state})}\n\n`);
        }
        if(partial.files) {
            for(const file of partial.files) {
                res.write(`data: ${JSON.stringify({file: {path: file.path, content: file.content}})}\n\n`);
            }
        }
    }
    res.write(`data: ${JSON.stringify({done: true})}\n\n`);
    res.end();
})

app.get("/repo-zip", async (req, res) => {
  const response = await fetch(
    "https://codeload.github.com/beam-cloud/react-vite-shadcn-ui/zip/refs/heads/main"
  );

  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", "application/zip");
  res.send(Buffer.from(buffer));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
