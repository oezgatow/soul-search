import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Heart, Camera, Mic } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, matched } = location.state || {};

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      content: "Hi there! Thanks for taking the time to answer my questions. I loved your creative answers! 😊",
      timestamp: "2:34 PM",
      type: "text"
    },
    {
      id: 2,
      sender: "user", 
      content: "Thank you! Your questions were really thought-provoking. I especially enjoyed the one about art forms.",
      timestamp: "2:36 PM",
      type: "text"
    },
    {
      id: 3,
      sender: "other",
      content: "I'm actually working on a watercolor series right now! Would you like to see one of my pieces?",
      timestamp: "2:37 PM", 
      type: "text"
    },
    {
      id: 4,
      sender: "other",
      content: "🎨 [Watercolor painting of a sunset]",
      timestamp: "2:37 PM",
      type: "media"
    },
    {
      id: 5,
      sender: "user",
      content: "Wow, that's beautiful! The way you captured the light is amazing. Do you paint often?",
      timestamp: "2:40 PM",
      type: "text"
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate response
      setTimeout(() => {
        const responses = [
          "That's such an interesting perspective!",
          "I'd love to hear more about that!",
          "We have so much in common! 😊",
          "What made you think of that?",
          "You have such a creative mind!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
          id: messages.length + 2,
          sender: "other",
          content: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text"
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1500);
    }
  };

  if (!profile) {
    navigate("/discovery");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/discovery")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-white/20 text-white">
              👩‍🎨
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="font-semibold">Sarah Chen</h1>
            <p className="text-white/80 text-sm">Active now</p>
          </div>

          {matched && (
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
              <Heart className="w-4 h-4 text-romantic" />
              <span className="text-xs">Matched</span>
            </div>
          )}
        </div>
      </div>

      {/* Match Alert */}
      {matched && (
        <Card className="mx-4 mt-4 bg-gradient-reveal text-white border-0">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">You matched with Sarah!</h3>
            <p className="text-white/90 text-sm">
              Your answers showed great compatibility. Start the conversation!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.sender === "user"
                ? "bg-gradient-primary text-white"
                : "bg-gradient-card shadow-soft"
            }`}>
              {msg.type === "media" ? (
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-mystery rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <span className="text-sm">Watercolor painting</span>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
              <p className={`text-xs mt-1 ${
                msg.sender === "user" ? "text-white/70" : "text-muted-foreground"
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Camera className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-4 py-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
          </div>
          
          <Button 
            variant="romantic" 
            size="icon" 
            onClick={sendMessage}
            disabled={!message.trim()}
            className="flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessage("Tell me more about your art!")}
            className="flex-shrink-0"
          >
            🎨 Tell me about your art
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessage("What's your favorite creative medium?")}
            className="flex-shrink-0"
          >
            ✨ Favorite medium?
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessage("I love your creative energy!")}
            className="flex-shrink-0"
          >
            💫 Love your energy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;