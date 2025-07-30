import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, MessageCircle, Star, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MatchReveal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, score, success } = location.state || {};

  const [revealed, setRevealed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (success) {
      setShowCelebration(true);
      setTimeout(() => {
        setRevealed(true);
      }, 2000);
    }
  }, [success]);

  const startChat = () => {
    navigate("/chat", { state: { profile, matched: true } });
  };

  const backToDiscovery = () => {
    navigate("/discovery");
  };

  if (!profile) {
    navigate("/discovery");
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-10 left-10 animate-bounce">
            <Sparkles className="w-8 h-8 text-romantic animate-pulse" />
          </div>
          <div className="absolute top-20 right-16 animate-bounce delay-100">
            <Star className="w-6 h-6 text-reveal animate-pulse" />
          </div>
          <div className="absolute top-32 left-1/2 animate-bounce delay-200">
            <Heart className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <div className="absolute top-16 right-8 animate-bounce delay-300">
            <Sparkles className="w-7 h-7 text-mystery animate-pulse" />
          </div>
          <div className="absolute top-40 left-20 animate-bounce delay-150">
            <Star className="w-5 h-5 text-accent animate-pulse" />
          </div>
        </div>
      )}

      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          It's a Match!
        </h1>
        <p className="text-muted-foreground">
          You scored {score}% and unlocked their photo!
        </p>
      </div>

      {/* Profile Reveal */}
      <div className="max-w-md mx-auto space-y-6">
        {/* Photo Reveal Card */}
        <Card className="bg-gradient-card border-0 shadow-reveal overflow-hidden">
          <CardContent className="p-0">
            {!revealed ? (
              /* Mystery State */
              <div className="bg-gradient-mystery p-8 text-center text-white relative">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm animate-pulse-soft">
                  <span className="text-4xl font-bold">?</span>
                </div>
                <h2 className="text-xl font-bold mb-2">{profile.anonymousName}</h2>
                <div className="animate-pulse">
                  <div className="w-full h-2 bg-white/20 rounded-full mb-2">
                    <div className="h-2 bg-gradient-reveal rounded-full animate-pulse" style={{ width: '70%' }} />
                  </div>
                  <p className="text-white/80 text-sm">Revealing photo...</p>
                </div>
              </div>
            ) : (
              /* Revealed State */
              <div className="relative animate-reveal">
                {/* Profile Photo */}
                <div className="bg-gradient-primary p-8 text-center text-white">
                  <div className="w-32 h-32 bg-white/90 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👩‍🎨</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Sarah Chen</h2>
                  <p className="text-white/90 text-sm">Artist & Philosophy Student</p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 mt-2">
                    Photo Revealed! 🎉
                  </Badge>
                </div>

                {/* Profile Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About Sarah</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Shared Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.slice(0, 3).map((interest: string, index: number) => (
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
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Challenge Results */}
        <Card className="bg-gradient-reveal text-white border-0">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold mb-2">Challenge Results</h3>
            <div className="flex justify-around text-sm">
              <div>
                <div className="text-2xl font-bold">{score}%</div>
                <div className="text-white/80">Your Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{profile.revealThreshold}%</div>
                <div className="text-white/80">Required</div>
              </div>
              <div>
                <div className="text-2xl font-bold">✓</div>
                <div className="text-white/80">Unlocked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Info */}
        {revealed && (
          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-romantic mx-auto mb-3" />
              <h3 className="font-semibold mb-2">You're Connected!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your answers showed great compatibility. Start a conversation to learn more about each other.
              </p>
              
              <div className="space-y-3">
                <Button 
                  variant="romantic" 
                  size="lg" 
                  onClick={startChat}
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chatting
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={backToDiscovery}
                  className="w-full"
                >
                  Discover More Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conversation Starters */}
        {revealed && (
          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Conversation Starters</h3>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    "I loved your answer about watercolor painting! What draws you to that medium?"
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    "Your quote about art resonated with me. Do you have a favorite artist?"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchReveal;