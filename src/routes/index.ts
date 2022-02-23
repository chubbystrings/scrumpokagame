import express from "express";
const router = express.Router();


/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Scrum poker server is running" });
});



export default router;
