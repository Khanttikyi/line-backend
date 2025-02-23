const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
const CHANNEL_ACCESS_TOKEN = 'DQ+6KCdWi+hgRn4h5CPRYB+6Eb41FANRufSvIg6ljaH/pdcgsKm65CcXg226Vlacbqv+qo/pkPlWmo1i1qoOkPoGuO+9PnF580V08OfFTWwf/pf1OmKd5e3hLRkaltY1ZxHzefci4/B3zTo+tdhFvwdB04t89/1O/w1cDnyilFU=';

app.post("/send-line-message", async (req, res) => {
    try {
        const { userId, message } = req.body;

        const response = await axios.post(
            LINE_API_URL,
            {
                to: userId,
                messages: [{ type: "text", text: message }],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
                },
            }
        );

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error sending LINE message:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
