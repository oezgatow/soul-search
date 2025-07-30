import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Music, Video, Image, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AvatarCreation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: "",
    interests: "",
    favoriteQuote: ""
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/question-selection");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold">Create Your Avatar</h1>
        <div className="text-sm text-muted-foreground">{step}/3</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Step 1: Media Upload */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Express Yourself</h2>
            <p className="text-muted-foreground">Add media that shows your personality</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Music className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Music</h3>
                <p className="text-sm text-muted-foreground">Share your favorite songs</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Video className="w-12 h-12 text-romantic mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Loops</h3>
                <p className="text-sm text-muted-foreground">3-second creative clips</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Image className="w-12 h-12 text-mystery mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Artwork</h3>
                <p className="text-sm text-muted-foreground">Personal or inspiring art</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">More</h3>
                <p className="text-sm text-muted-foreground">Other creative content</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-dashed border-2 border-muted bg-muted/20">
            <CardContent className="p-8 text-center">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Tap to upload your first piece</p>
              <Button variant="outline">Choose Files</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Bio & Interests */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Tell Your Story</h2>
            <p className="text-muted-foreground">Share what makes you unique</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bio">Your Bio</Label>
              <Textarea 
                id="bio"
                placeholder="Write something that captures your essence..."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="interests">Interests & Passions</Label>
              <Input 
                id="interests"
                placeholder="Art, hiking, cooking, philosophy..."
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="quote">Favorite Quote or Life Motto</Label>
              <Textarea 
                id="quote"
                placeholder="Something that inspires you..."
                value={formData.favoriteQuote}
                onChange={(e) => setFormData({...formData, favoriteQuote: e.target.value})}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Avatar Preview</h2>
            <p className="text-muted-foreground">How others will discover you</p>
          </div>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">?</span>
                </div>
                <h3 className="text-xl font-semibold">Anonymous User</h3>
                <p className="text-muted-foreground">Photo reveals after connection</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">{formData.bio || "Your bio will appear here..."}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Interests</h4>
                  <p className="text-sm text-muted-foreground">{formData.interests || "Your interests will appear here..."}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Quote</h4>
                  <p className="text-sm text-muted-foreground italic">"{formData.favoriteQuote || "Your quote will appear here..."}"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-4 left-4 right-4">
        <Button 
          variant="romantic" 
          size="lg" 
          onClick={handleNext}
          className="w-full"
        >
          {step === 3 ? "Continue to Questions" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AvatarCreation;