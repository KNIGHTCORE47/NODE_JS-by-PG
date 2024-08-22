import express from 'express'
import {
    handleGenerateNewShortURL,
    handleReRouteToShortURL,
    handleGetAnalytics
} from '../controllers/url.controllers.js'

const router = express.Router();

router.post("/", handleGenerateNewShortURL)
router.get("/:shortId", handleReRouteToShortURL)
router.get("/analytics/:shortId", handleGetAnalytics)

export default router