const express = require("express");
const animesroutes = require("./routes/animes.route");
const studiosroutes = require("./routes/studios");
const directorsroutes = require("./routes/directors.route");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/animes", animesroutes);
app.use("/studios", studiosroutes);
app.use("/directors", directorsroutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});