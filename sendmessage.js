

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PROFILE_API_URL = "https://api.line.me/v2/bot/profile/";
const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
const CHANNEL_ACCESS_TOKEN = 'DQ+6KCdWi+hgRn4h5CPRYB+6Eb41FANRufSvIg6ljaH/pdcgsKm65CcXg226Vlacbqv+qo/pkPlWmo1i1qoOkPoGuO+9PnF580V08OfFTWwf/pf1OmKd5e3hLRkaltY1ZxHzefci4/B3zTo+tdhFvwdB04t89/1O/w1cDnyilFU=';


// ✅ Send LINE message
app.post("/send-line-message", async (req, res) => {
    try {
        const { userId, message } = req.body;
        const response = await axios.post(
            LINE_API_URL,
            { to: userId, messages: [{ type: "text", text: message }] },
            { headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` } }
        );
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Send Message Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

// 🔍 Get LINE user profile
app.get("/get-user-profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.get(PROFILE_API_URL + userId, {
            headers: { Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` },
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Profile Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

// 🌐 Generate LIFF URL (if needed)
app.post("/generate-liff", async (req, res) => {
    try {
        const { url } = req.body;
        const response = await axios.post(
            "https://api.line.me/liff/v1/apps",
            { view: { type: "full", url: url } },
            { headers: { Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`, "Content-Type": "application/json" } }
        );
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("LIFF Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

// 🌟 Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

