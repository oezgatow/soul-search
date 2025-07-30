import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AvatarCreation from "./pages/AvatarCreation";
import QuestionSelection from "./pages/QuestionSelection";
import Discovery from "./pages/Discovery";
import QuestionGame from "./pages/QuestionGame";
import MatchReveal from "./pages/MatchReveal";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/avatar-creation" element={<AvatarCreation />} />
          <Route path="/question-selection" element={<QuestionSelection />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/question-game" element={<QuestionGame />} />
          <Route path="/match-reveal" element={<MatchReveal />} />
          <Route path="/chat" element={<Chat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
