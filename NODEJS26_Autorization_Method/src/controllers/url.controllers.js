import { nanoid } from 'nanoid'
import URL from '../models/url.models.js'

async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    // console.log(body.URL);

    if (!body.URL) return res.status(400).json({ error: "url is required" })
    const shortID = nanoid(8)
    await URL.create(
        {
            shortId: shortID,
            redirectURL: body.URL,
            visitHistory: [],
            createdBy: req.user._id
        }
    )

    return res.status(200).render("home.views.ejs", { id: shortID })
    // return res.status(200).json({ message: "Success!!", id: shortID })
}

async function handleReRouteToShortURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                }
            }
        }
    )

    if (!entry) {
        return res.status(404).json({ message: "Short URL not found" });
    }

    //Bug Fix: Ensure the redirect URL starts with 'http://' or 'https://'
    let redirectUrl = entry.redirectURL;

    if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
        redirectUrl = 'https://' + redirectUrl;
    }
    console.log("Redirecting to " + redirectUrl);

    return res.status(302).redirect(redirectUrl);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })

    if (!result) return res.status(404).json({ message: "Short URL not found" })

    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        anlytics: result.visitHistory
    })

}

export {
    handleGenerateNewShortURL,
    handleReRouteToShortURL,
    handleGetAnalytics
}
