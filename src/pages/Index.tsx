import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-primary opacity-90"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-60" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-float">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse-soft" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Not Physical
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Connect through personality, not just photos.<br />
            Discover real compatibility through creative expression.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="reveal" 
              size="xl" 
              className="animate-reveal"
              onClick={() => window.location.href = '/avatar-creation'}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/20 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.location.href = '/discovery'}
            >
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A revolutionary approach to dating that values depth over superficiality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Create Your Avatar
                </h3>
                <p className="text-muted-foreground">
                  Express yourself through music, art, videos, and creative content instead of just photos
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-mystery rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Choose Questions
                </h3>
                <p className="text-muted-foreground">
                  Select thought-provoking questions that reveal your personality and values
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-reveal rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Gradual Reveal
                </h3>
                <p className="text-muted-foreground">
                  Photos are revealed only after meaningful connections are established
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Safe & Authentic
                </h3>
                <p className="text-muted-foreground">
                  Build genuine connections in a safe, judgment-free environment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Connect Differently?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands discovering meaningful relationships through personality and creativity
          </p>
          <Button 
            variant="reveal" 
            size="xl"
            className="animate-float"
            onClick={() => window.location.href = '/avatar-creation'}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;