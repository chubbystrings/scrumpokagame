import express from "express";
const router = express.Router();
import { shorten } from "../shortenUrl/index";


router.post("/", async (req, res, next) => {
  try {
    if (req.body.url) {
      const url = await shorten(req.body.url);
      res.status(200).send({
        url,
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
});

export default router;
