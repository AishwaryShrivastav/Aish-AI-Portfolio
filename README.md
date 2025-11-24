# Architect.AI - Future Tech Portfolio

A futuristic, cyberpunk-themed portfolio website built for Technical Architects and Engineers. It features a fully integrated **Client-Side CMS**, a **Context-Aware AI Assistant** (supporting OpenAI, Gemini, and Hugging Face), and a high-performance, animation-heavy UI.

![Cyberpunk UI](https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3870&auto=format&fit=crop)

## 🚀 Key Features

*   **🎨 Cyberpunk Aesthetic**: High-tech visuals with neon glows, glassmorphism, and smooth Framer Motion animations.
*   **🧠 Integrated AI Assistant**: A floating AI chat interface that knows your portfolio content.
    *   **Multi-Model Support**: Switch between **OpenAI (GPT-4o)**, **Google Gemini**, and **Hugging Face** on the fly.
    *   **Context-Aware**: The AI automatically reads your portfolio data (experience, projects, stack) to answer visitor questions accurately.
    *   **Voice Support**: Speech-to-text capabilities for interacting with the AI.
*   **📝 Built-in CMS**: A password-protected admin panel to edit **everything** on the site without touching code.
    *   Edit Hero text, rotating words, and background.
    *   Manage Projects, Experience, Education, and Social links.
    *   Configure AI prompts and API keys directly in the UI.
    *   **Secret Access**: Click the Lock icon in the AI chat and enter the admin code.
*   **📊 Stealth Analytics**: Tracks visitor counts, device types (Mobile vs Desktop), and session timestamps locally.
*   **📱 Fully Responsive**: Fluid design that works perfectly on mobile, tablet, and desktop.

## 🛠️ Tech Stack

*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **AI Integration**: OpenAI SDK, Google GenAI SDK, Hugging Face Inference API

## 💻 Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/architect-ai-portfolio.git
    cd architect-ai-portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Dev Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

## 🌍 Deployment (Netlify)

This project is optimized for easy deployment on Netlify.

1.  **Build the Project**
    ```bash
    npm run build
    ```
    This creates a `dist` folder ready for static serving.

2.  **Deploy to Netlify**
    *   Connect your GitHub repository to Netlify.
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
    
3.  **Environment Variables (Optional)**
    Since the CMS allows you to enter API keys directly in the browser (stored in `localStorage`), you don't *strictly* need server-side env vars. However, to provide default keys:
    *   Go to **Site Settings > Environment Variables** in Netlify.
    *   Add `VITE_API_KEY` (for OpenAI default).
    *   Add `VITE_GEMINI_KEY` (for Gemini default).
    *   Add `VITE_HF_TOKEN` (for Hugging Face default).

## 🔐 How to Use the CMS

The CMS is hidden behind the AI interface to maintain the immersive experience.

1.  **Open the AI Chat**: Click the floating **AI** button in the bottom right.
2.  **Unlock Admin Mode**: Click the small **Lock Icon** 🔒 in the chat header.
3.  **Enter Access Code**:
    *   Default Password: `iamSAI!^35`
4.  **Edit Content**:
    *   **General**: Change Hero title, rotating text, and background.
    *   **Sections**: Add/Remove/Edit Projects, Experience cards, etc.
    *   **AI**: Switch between OpenAI/Gemini/HF, paste your API keys, and update the System Prompt.
    *   **Analytics**: View visitor stats.
5.  **Save**: Click the **Save** button. Changes are persisted to the user's browser `localStorage` immediately.

## 🤖 AI Configuration

The AI is designed to be "RAG-lite" (Retrieval-Augmented Generation).

*   **System Prompt**: You can edit the base personality of the AI in the CMS.
*   **Context Injection**: The app automatically appends a text summary of your **entire portfolio** (Projects, Bio, Resume) to the system prompt. This ensures the AI always has the latest context about you.

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── AIChat.tsx       # The floating AI assistant & Admin auth
│   │   ├── CMS.tsx          # The Admin Dashboard
│   │   └── SectionRenderer.tsx # Dynamic renderer for all section types
│   ├── services/
│   │   ├── aiService.ts     # Central dispatcher for AI requests
│   │   ├── openaiService.ts # OpenAI integration
│   │   ├── geminiService.ts # Google Gemini integration
│   │   └── huggingFaceService.ts
│   ├── App.tsx              # Main layout & State management
│   ├── constants.ts         # Seed data (Initial content)
│   └── types.ts             # TypeScript interfaces
├── index.html               # Entry point
└── vite.config.ts           # Vite configuration
```

## 📄 License

MIT License. Feel free to use this template for your own portfolio!
