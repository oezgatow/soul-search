import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, X, Sparkles, Music, Camera, Palette, Paintbrush, Star, Coffee, Book, Mountain, Code, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Discovery = () => {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(0);

  const profiles = [
    {
      id: 1,
      anonymousName: "Creative Soul",
      bio: "I find beauty in the mundane and magic in everyday moments. Currently learning to paint watercolors and teaching myself guitar.",
      interests: ["Watercolor painting", "Guitar", "Poetry", "Coffee art", "Vintage books"],
      quote: "The purpose of art is washing the dust of daily life off our souls.",
      mediaTypes: ["music", "art", "video"],
      questionCount: 4,
      revealThreshold: 75,
      location: "2 miles away",
      avatar: {
        bgColor: "bg-gradient-to-br from-purple-400 to-pink-400",
        icon: Paintbrush,
        initials: "CS"
      },
      media: [
        {
          type: "music",
          title: "Watercolor Dreams",
          description: "Original guitar composition",
          link: "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC",
          platform: "Spotify"
        },
        {
          type: "art", 
          title: "Morning Coffee Series",
          description: "Watercolor paintings of daily rituals",
          link: "https://www.instagram.com/p/example",
          platform: "Instagram"
        },
        {
          type: "video",
          title: "Poetry in Motion",
          description: "3-second loop of brush strokes",
          link: "https://www.tiktok.com/@example",
          platform: "TikTok"
        }
      ]
    },
    {
      id: 2, 
      anonymousName: "Wandering Mind",
      bio: "Philosophy student by day, stargazer by night. I believe the best conversations happen under open skies.",
      interests: ["Astronomy", "Philosophy", "Hiking", "Jazz music", "Documentary films"],
      quote: "We are all made of star stuff.",
      mediaTypes: ["video", "music"],
      questionCount: 4,
      revealThreshold: 50,
      location: "5 miles away",
      avatar: {
        bgColor: "bg-gradient-to-br from-indigo-400 to-purple-400",
        icon: Star,
        initials: "WM"
      },
      media: [
        {
          type: "music",
          title: "Cosmic Jazz Playlist",
          description: "Late night stargazing soundtrack",
          link: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
          platform: "Spotify"
        },
        {
          type: "video",
          title: "Milky Way Timelapse",
          description: "3-hour condensed into 30 seconds",
          link: "https://www.youtube.com/watch?v=example",
          platform: "YouTube"
        },
        {
          type: "art",
          title: "Philosophy Sketches",
          description: "Visual interpretations of abstract concepts",
          link: "https://www.behance.net/gallery/example",
          platform: "Behance"
        }
      ]
    },
    {
      id: 3,
      anonymousName: "Digital Dreamer", 
      bio: "UX designer who codes on weekends and grows plants during the week. Building apps that make people smile.",
      interests: ["Design", "Coding", "Succulents", "Board games", "Craft beer"],
      quote: "Design is not just what it looks like - design is how it works.",
      mediaTypes: ["art", "video", "music"],
      questionCount: 4,
      revealThreshold: 100,
      location: "1 mile away",
      avatar: {
        bgColor: "bg-gradient-to-br from-emerald-400 to-teal-400",
        icon: Code,
        initials: "DD"
      },
      media: [
        {
          type: "art",
          title: "UI Design Portfolio",
          description: "Mobile app designs & prototypes",
          link: "https://dribbble.com/shots/example",
          platform: "Dribbble"
        },
        {
          type: "music",
          title: "Coding Beats",
          description: "Lo-fi hip hop for productivity",
          link: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
          platform: "Spotify"
        },
        {
          type: "video",
          title: "Plant Growth Timelapse",
          description: "Succulent collection over 6 months",
          link: "https://www.instagram.com/reel/example",
          platform: "Instagram"
        }
      ]
    }
  ];

  const currentUser = profiles[currentProfile];

  const handleLike = () => {
    navigate("/question-game", { state: { profile: currentUser } });
  };

  const handlePass = () => {
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1);
    } else {
      setCurrentProfile(0); // Loop back to first profile
    }
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "music": return <Music className="w-4 h-4" />;
      case "art": return <Palette className="w-4 h-4" />;
      case "video": return <Camera className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Not Physical
        </h1>
        <Badge variant="secondary" className="bg-gradient-mystery text-white">
          Discovery Mode
        </Badge>
      </div>

      {/* Profile Cards Stack */}
      <div className="relative max-w-md mx-auto">
        <Card className="bg-gradient-card border-0 shadow-soft overflow-hidden">
          <CardContent className="p-0">
            {/* Avatar Section */}
            <div className="bg-gradient-mystery p-8 text-center text-white">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className={`${currentUser.avatar.bgColor} text-white`}>
                  <currentUser.avatar.icon className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-2">{currentUser.anonymousName}</h2>
              <p className="text-white/80 text-sm mb-4">{currentUser.location}</p>
              
              {/* Media Types */}
              <div className="flex justify-center gap-2">
                {currentUser.mediaTypes.map((type, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-white/20 text-white border-0 backdrop-blur-sm"
                  >
                    {getMediaIcon(type)}
                    <span className="ml-1 capitalize">{type}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="font-semibold mb-2 text-foreground">About</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {currentUser.bio}
                </p>
              </div>

              {/* Interests */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs bg-gradient-primary text-white border-0"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Quote</h3>
                <p className="text-muted-foreground text-sm italic">
                  "{currentUser.quote}"
                </p>
              </div>

              {/* Media Content */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Featured Content</h3>
                <div className="space-y-3">
                  {currentUser.media.map((item, index) => (
                    <Card key={index} className="bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getMediaIcon(item.type)}
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.platform}
                            </Badge>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Question Challenge - Hidden threshold info */}
              <Card className="bg-gradient-reveal border-0 text-white">
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Connection Challenge</h4>
                  <p className="text-white/90 text-sm">
                    Complete the compatibility quiz to unlock their photo
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Background Cards for Stack Effect */}
        <div className="absolute -z-10 top-2 left-2 right-2 h-full bg-white/50 rounded-lg transform rotate-1" />
        <div className="absolute -z-20 top-4 left-4 right-4 h-full bg-white/30 rounded-lg transform -rotate-1" />
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
        <Button
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-destructive hover:bg-destructive hover:text-white transition-all duration-300 shadow-soft"
          onClick={handlePass}
        >
          <X className="w-8 h-8" />
        </Button>

        <Button
          variant="romantic"
          size="icon" 
          className="w-20 h-20 rounded-full shadow-hover transition-all duration-300 transform hover:scale-110"
          onClick={handleLike}
        >
          <Heart className="w-10 h-10" />
        </Button>
      </div>

      {/* Profile Counter */}
      <div className="fixed top-20 right-4">
        <Badge variant="secondary" className="bg-white/80 text-foreground">
          {currentProfile + 1} / {profiles.length}
        </Badge>
      </div>
    </div>
  );
};

export default Discovery;