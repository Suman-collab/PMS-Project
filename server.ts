import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Inquiries store for PMS Innovation Solutions
const inquiriesStore: Array<{
  id: string;
  name: string;
  phone: string;
  email: string;
  eventDetails: string;
  serviceCategory?: string;
  scale?: string;
  duration?: string;
  status: string;
  createdAt: string;
}> = [
  {
    id: "PMS-INQ-101",
    name: "Rajesh Banerjee",
    phone: "+91 98316 30072",
    email: "r.banerjee@eastindiatech.com",
    eventDetails: "Annual National Leadership MICE Conference & Dealer Meet in Kolkata for 450 delegates with 3D LED stage and hotel management.",
    serviceCategory: "Corporate Events & MICE",
    scale: "300-800 Guests / Large",
    duration: "Full Day Event (8 Hours)",
    status: "Lead Contacted",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

// Lazy AI Client
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get Inquiries
app.get("/api/inquiries", (_req, res) => {
  res.json({ success: true, data: inquiriesStore });
});

// Submit Inquiry
app.post("/api/inquiries", (req, res) => {
  try {
    const { name, phone, email, eventDetails, serviceCategory, scale, duration } = req.body;
    if (!phone || !email || !eventDetails) {
      res.status(400).json({ error: "Phone, email, and event details are required." });
      return;
    }

    const newInquiry = {
      id: `PMS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || "Corporate Client",
      phone,
      email,
      eventDetails,
      serviceCategory: serviceCategory || "360° Integrated Marketing & Events",
      scale: scale || "Standard Corporate",
      duration: duration || "Custom Timeline",
      status: "In Review by Team PMS",
      createdAt: new Date().toISOString(),
    };

    inquiriesStore.unshift(newInquiry);
    res.status(201).json({ success: true, data: newInquiry });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to submit inquiry." });
  }
});

// Update Inquiry Status or Details
app.patch("/api/inquiries/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, priority, estimatedValue } = req.body;
    const inquiry = inquiriesStore.find((item) => item.id === id);
    if (!inquiry) {
      res.status(404).json({ error: "Inquiry not found." });
      return;
    }
    if (status !== undefined) (inquiry as any).status = status;
    if (notes !== undefined) (inquiry as any).notes = notes;
    if (priority !== undefined) (inquiry as any).priority = priority;
    if (estimatedValue !== undefined) (inquiry as any).estimatedValue = estimatedValue;

    res.json({ success: true, data: inquiry });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update inquiry." });
  }
});

// Delete Inquiry
app.delete("/api/inquiries/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = inquiriesStore.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({ error: "Inquiry not found." });
      return;
    }
    inquiriesStore.splice(index, 1);
    res.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete inquiry." });
  }
});

// Newsletter subscription
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email address is required." });
    return;
  }
  res.json({ success: true, message: "Thank you for subscribing to PMS Innovation Solutions marketing updates." });
});

// AI Proposal & Event Budget Generator for Admin CMS
app.post("/api/ai/generate-proposal", async (req, res) => {
  try {
    const { clientName, eventType, scale, location, budgetRange, specialRequirements } = req.body;
    const ai = getAI();

    const prompt = `Generate a high-level B2B Corporate Event & Marketing Proposal for a client of PMS INNOVATION SOLUTIONS.
Client Name: ${clientName || 'Corporate Client'}
Event/Project Type: ${eventType || 'Annual Corporate Meet & MICE Event'}
Scale/Guest Count: ${scale || '250-500 Delegates'}
Target Location: ${location || 'Kolkata, West Bengal / Pan-India'}
Budget Target: ${budgetRange || 'Enterprise Tier'}
Special Requirements: ${specialRequirements || 'Turnkey execution with 3D stagecraft, audio visual, artist management, and delegate hospitality'}

Company: PMS INNOVATION SOLUTIONS (360° Marketing & Corporate Event Management Agency, Kolkata).
Hotlines: +91 98316 30072 | +91 80175 30072 | info@pmsinnovations.com

Please output a structured, professional proposal including:
1. Executive Summary & Creative Concept
2. Scope of Deliverables & Turnkey Execution (Stagecraft, AV, Branding, Guest Flow, Run-of-Show)
3. Suggested Itinerary / Timeline Breakdown
4. Indicative Budget Allocation Breakdown
5. PMS Precision SLA & Key Value Proposition
Format in clean Markdown with clear headings and bullet points.`;

    const chat = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction: "You are the Senior Event Director and Commercial Proposal Strategist at PMS INNOVATION SOLUTIONS. Output formal, high-impact, professional proposal documents ready to send to clients.",
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message: prompt });
    res.json({
      success: true,
      proposal: response.text || "Proposal generated successfully.",
    });
  } catch (error: any) {
    console.error("Proposal generator error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate proposal.",
      fallback: `# PMS INNOVATION SOLUTIONS - Turnkey Event Proposal\n\n**Client**: ${req.body?.clientName || 'Corporate Partner'}\n**Service**: ${req.body?.eventType || 'Corporate Event Management'}\n\n## 1. Executive Summary\nPMS Innovation Solutions is pleased to submit this comprehensive scope for turnkey execution with complete stagecraft, audio-visual, on-ground manpower, and seamless SLA delivery.\n\n## 2. Inclusions & Deliverables\n- Customized 3D Stage & High-Density LED Video Backdrop\n- Line-Array Sound System with Multi-Zone Digital Mixing\n- Registration Desks & RFID Smart Badge Check-ins\n- Dedicated Show Caller & Stage Manager\n\n## 3. Contact & Next Steps\nFor final contracts, contact our executive desk at +91 98316 30072 or info@pmsinnovations.com.`
    });
  }
});

// AI Marketing & Corporate Event Strategist
app.post("/api/ai/assistant-chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const ai = getAI();

    const conversationHistory = Array.isArray(messages) ? messages : [];
    const systemInstruction = `You are the Lead Marketing & Corporate Event Strategist at PMS INNOVATION SOLUTIONS (Headquarters: Kolkata, Pan-India Operations).
    PMS is a full-service, 360-degree marketing and corporate event management agency connecting brands with people across every touchpoint.
    Key disciplines:
    - Corporate Event Management (Conferences, Product Launches, Exhibitions, Dealer Meets)
    - MICE Services (Meetings, Incentives, Conferences, Exhibitions with travel & destination planning)
    - Brand Activation & Experiential (Mall activations, roadshows, sampling kiosks, promoter staffing)
    - Retail Shop Branding (Illuminated 3D acrylic signs, window displays, in-store graphics, POS stands)
    - Hoarding & Outdoor Advertising (Billboards on EM Bypass/highways, flex printing, transit media)
    - Digital Marketing & Campaigns (Social media management, Meta & Google performance ads, video content)
    - Merchandising & Corporate Gifting (Custom executive hampers, branded tech gadgets, apparel)

    Tone: Professional, direct, enthusiastic, high-impact, business-savvy.
    Contact hotline: +91 98316 30072 / +91 80175 30072 | info@pmsinnovations.com | Ground Floor, 1174, Madurdaha, Hussainpur, Kolkata 700107.
    Provide concise, actionable advice (2-3 paragraphs max) and invite the user to connect via WhatsApp or request an official spec quotation.`;

    const chat = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const lastUserMessage = conversationHistory[conversationHistory.length - 1]?.text || "Hello! Can you help plan our corporate conference and marketing activation?";
    const response = await chat.sendMessage({ message: lastUserMessage });

    res.json({
      success: true,
      reply: response.text || "Hello! At PMS Innovation Solutions, we specialize in end-to-end 360° marketing, MICE, brand activations, and turnkey corporate events. How can we elevate your brand's presence today?",
    });
  } catch (error: any) {
    console.error("Chat assistant error:", error);
    res.json({
      success: true,
      reply: "At PMS Innovation Solutions, we provide 360° integrated marketing and corporate event management across Kolkata and Pan-India. From large-scale MICE conferences and retail branding to outdoor hoardings and digital campaigns, our team ensures precision execution. Would you like us to prepare a turnkey proposal for your upcoming requirement?",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PMS Innovation Solutions Server running on port ${PORT}`);
  });
}

startServer();
